---
title: Linux为何没有C盘
published: 2026-09-10
description: Linux硬盘管理的方式
image: ./images/albums/AcgExample/03.webp
tags: [底层原理]
category: Linux
draft: false
---

# Linux为何没有C盘

> 你是不是也觉得，电脑天生就该有C盘、D盘？那恭喜你，你被Windows洗脑啦！

## 1. Windows 是怎么管理硬盘的？

在聊 Linux 之前，先回忆一下 Windows 是怎么管理硬盘的。

你买一台新电脑，打开"此电脑"，看到 **C 盘**、**D 盘**，可能还有个 **E 盘**。每个盘有自己的容量、自己的文件，互不干扰。你往 **C 盘**装系统，往 **D 盘**存电影，往 **E 盘**放游戏——清清楚楚。

这套方式太深入人心了，以至于很多人默认"电脑就该是这样"，是不是感觉自己被Windows洗脑了？

但你可能没想过一个问题：**电脑真的该是这样吗？** 其实不是的。至少...... Linux不这么认为

---

## 2. Linux 是怎么管理硬盘的？

### 2.1 设备文件
Linux中没有 **盘符** 的概念，所有硬盘都是 `/dev` 下的一个 **设备文件**：

- SATA/SAS硬盘通常在 `/dev/sdX`
- NVMe硬盘通常在 `/dev/nvmeX`
- 虚拟机磁盘通常在 `/dev/vdX`

### 2.2 为何没有C盘？
因为Linux使用设备文件而非盘符管理硬盘。Windows用盘符给每块硬盘分配一个独立的"入口"，而Linux把所有设备都挂到同一棵目录树下。

你看到的 `/`、`/home`、`/data1` 可能来自完全不同的硬盘，但对用户来说，它们只是路径——没有C，没有D，只有 `/`。

你在Linux里 `cd /home` 和 `cd /data1`，感受不到它们可能来自两块完全不同的物理硬盘——**这就是设计意图**。

---

## 3. 挂载硬盘
Linux不像Windows一样开机默认挂载所有可挂载的硬盘。如果想使用硬盘，你需要**挂载**：

```shell
mount <device> <dir>
```

`<device>` 表示设备文件的路径，通常是分区的设备文件。使用 `lsblk` 查看所有硬盘的分区：

```text
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda           8:0    0  256G  0 disk
├─sda1        8:1    0    1G  0 part /boot/efi
└─sda2        8:2    0  255G  0 part /
nvme0n1     259:0    0  256G  0 disk
├─nvme0n1p1 259:1    0    1G  0 part 
└─nvme0n1p2 259:2    0  255G  0 part
```

挂载示例：
```shell
sudo mount /dev/nvme0n1p1 /mnt
```
> **注意**：必须用 `sudo`，普通用户无法挂载硬盘。

---

## 4. Linux 自动挂载硬盘
使用 `mount` 命令挂载无法持久化，重启就会丢失，所以我们需要**开机自动挂载**。

### 4.1 SysVinit 方式（/etc/fstab）
传统的 `SysVinit` 会调用 `mount -a`，读取 `/etc/fstab` 进行挂载：

```text
<设备> <挂载点> <文件系统> defaults 0  0
```
**建议用UUID代替设备路径**（设备名可能变动）：
```shell
blkid -s UUID <设备文件>
```
填入：
```text
UUID=<请填入UUID> <挂载点> auto defaults,nofail 0 2
```

### 4.2 Systemd 方式（.mount 单元）
新发行版多用Systemd，虽然也能用 `/etc/fstab`，但更推荐 `.mount` 单元。

获取UUID：
```shell
blkid -s UUID <设备文件>
```
生成单元文件名：
```shell
systemd-escape -p --suffix=mount <挂载点>
```
 > 例如输出：mnt-data.mount
 
编辑 `/etc/systemd/system/mnt-data.mount`
```ini
[Unit]
Description=<看你心情怎么写都可以>

[Mount]
What=UUID=<请填入UUID>
Where=/mnt/data
Type=auto
Options=defaults

[Install]
WantedBy=local-fs.target
```
启用：
```shell
sudo systemctl enable mnt-data.mount
```

启用并且马上挂载：
```shell
sudo systemctl enable --now mnt-data.mount
```

---

## 5. 回顾一下
Windows 用盘符把硬盘切成独立的盒子，Linux 用一棵目录树消化所有存储设备。

从 `mount` 到 `/etc/fstab` 再到 `.mount` 单元，本质上都是在做同一件事——**告诉系统"这块硬盘，挂到哪棵树上"**。

理解了这一点，你就不只是知道了"为什么没有 C 盘"，而是真正理解了 Linux 看待硬件的方式。

**对了，抱怨一下，Windows那种盘符设计在我眼里实属狗屎一坨啊，Poops Mountain实锤，太差了**
