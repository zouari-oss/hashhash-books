# Mounting an `.ova` File on a Linux Machine

## Accessing the Virtual Disk Inside an OVA (VMDK → RAW → Mount)

An `.ova` file is an **Open Virtual Appliance** archive.
It **cannot be mounted directly**, because it is just a `.tar` file containing:

- `*.ovf` → VM configuration
- `*.vmdk` → Virtual disk image
- `*.mf` → Manifest (sometimes)

To mount the OVA’s filesystem on a real Linux machine, you must:

1. Extract the VMDK
2. Convert it to RAW
3. Attach it to a loop device
4. Mount its partitions

This guide explains each step.

## 1. Extract the OVA

```bash
mkdir ~/ova_extract
cd ~/ova_extract
tar -xvf /path/to/file.ova
```

After extraction, you should see something like:

```
myvm.ovf
myvm-disk1.vmdk
myvm-disk2.vmdk  (optional)
```

The **`.vmdk`** file is the virtual machine’s disk.

## 2. Convert VMDK → RAW (recommended)

Linux can mount RAW disk images more reliably than VMDK.

Install the needed tool:

```bash
sudo apt install qemu-utils
```

Convert:

```bash
qemu-img convert -f vmdk -O raw <input_vmdk_file.vmdk> <output_raw_file.raw>
qemu-img convert -f raw -O vmdk <input_raw_file.raw> <output_vmdk_file.vmdk> # From .raw to .vmdk
```

## 3. Identify Partitions in the RAW Disk

Run:

```bash
sudo fdisk -l myvm.raw
```

Example output:

```
Device        Start       End   Sectors  Size Type
myvm.raw1      2048   1050623   1048576  512M Linux filesystem
myvm.raw2   1050624  8390655   7340032  3.5G Linux filesystem
```

Note the **Start sector** of the partition you want to mount.

### Calculate the offset

```
offset = Start_sector × 512
```

Example:

```
1050624 × 512 = 538968064
```

## 4. Attach the Partition Using `losetup`

```bash
sudo losetup --offset 538968064 --find --show myvm.raw
```

This prints something like:

```
/dev/loop7
```

This loop device represents the selected partition.

## 5. Mount the Partition

```bash
sudo mkdir -p /mnt/ova
sudo mount /dev/loop7 /mnt/ova
```

Your OVA’s filesystem is now mounted at:

```
/mnt/ova
```

You can now:

- read files
- modify system configs
- reset passwords
- recover data

## 6. Unmount When Finished

Unmount the filesystem:

```bash
sudo umount /mnt/ova
```

Detach **only the selected loop device**:

```bash
sudo losetup -d /dev/loop7
```

Or detach **all** loop devices (be careful):

```bash
sudo losetup -D
```

## Summary

| Step | Action                                         |
| ---- | ---------------------------------------------- |
| 1    | Extract OVA (`tar -xvf`)                       |
| 2    | Convert VMDK → RAW (`qemu-img convert`)        |
| 3    | Inspect disk partitions (`fdisk -l`)           |
| 4    | Attach specific partition (`losetup --offset`) |
| 5    | Mount it (`mount`)                             |
| 6    | Unmount and detach (`umount`, `losetup -d`)    |

---

## Need Help?

If you show:

- your `fdisk -l myvm.raw` output
- and the VMDK filename

I can help you calculate the correct mount offset or guide you through password recovery.
