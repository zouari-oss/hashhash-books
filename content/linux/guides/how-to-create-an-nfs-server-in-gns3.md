# **How to Create an NFS Server in GNS3**

This guide explains how to set up an **NFS server** inside **GNS3** using a Linux virtual machine (Ubuntu/Debian/CentOS). The same steps work whether you use the **GNS3 VM**, **QEMU**, **VirtualBox**, or **VMware**.

## **📌 Requirements**

- GNS3 installed
- A Linux VM added to GNS3
- A client VM/device to test NFS

# **1. Add a Linux VM to GNS3**

You can add your Linux system in two main ways:

### **Option A — QEMU VM inside GNS3**

1. Go to **Edit → Preferences → QEMU → New VM**
2. Import an Ubuntu/Debian/CentOS ISO
3. Install normally

### **Option B — Connect VMware/VirtualBox to GNS3**

1. Install Linux in your hypervisor
2. Add it via: **Edit → Preferences → VMware/VirtualBox VMs**

When finished, the VM will appear in the GNS3 device list.

# **2. Configure Network Inside the VM**

Give the VM an IP that matches your GNS3 topology:

```bash
sudo ip addr add 192.168.10.10/24 dev eth0
sudo ip link set eth0 up
```

Verify connectivity from an NFS client:

```bash
ping 192.168.10.10
```

# **3. Install NFS Server**

### **Ubuntu/Debian**

```bash
sudo apt update
sudo apt install nfs-kernel-server -y
```

### **CentOS/RHEL**

```bash
sudo yum install nfs-utils -y
sudo systemctl enable --now nfs-server
```

# **4. Create the NFS Shared Directory**

```bash
sudo mkdir -p /srv/nfs/shared
sudo chown nobody:nogroup /srv/nfs/shared
```

# **5. Configure `/etc/exports`**

Edit the export file:

```bash
sudo nano /etc/exports
```

Add:

```
/srv/nfs/shared   192.168.10.0/24(rw,sync,no_subtree_check)
```

Apply the configuration:

```bash
sudo exportfs -ra
sudo systemctl restart nfs-kernel-server
```

# **6. (Optional) Configure Firewall**

### **Ubuntu**

```bash
sudo ufw allow nfs
```

### **CentOS**

```bash
sudo firewall-cmd --add-service=nfs --permanent
sudo firewall-cmd --reload
```

# **7. Test the NFS Server from a Client**

### **Install NFS client**

```bash
sudo apt install nfs-common -y
```

### **Mount the share**

```bash
sudo mount 192.168.10.10:/srv/nfs/shared /mnt
```

### **Verify**

```bash
ls /mnt
touch /mnt/testfile
ls /mnt
```

If you see `testfile`, the NFS share is working correctly.

# **✔ Summary**

You now have:

- A Linux VM acting as an **NFS server** in GNS3
- A configured shared directory
- A working connection from an NFS client
