# Lenovo ThinkSystem SR650 V2 Guide

A brief overview and deployment guide for the Lenovo ThinkSystem SR650 V2 server.

---

## 🖥️ Overview

The SR650 V2 is a 2U rack server built for performance and scalability. It supports a wide range of workloads including virtualization, software-defined storage (SDS), AI inferencing, and general enterprise applications.

---

## ✅ Key Specs

- **Form Factor:** 2U rackmount
- **Processors:** Up to 2x Intel Xeon Scalable Gen 3 (Ice Lake), up to 40 cores each
- **Memory:** Up to 8TB DDR4 or 12TB with Intel Optane PMem
- **Storage:**
  - Up to 20x 3.5" or 40x 2.5" drives
  - Supports SATA, SAS, NVMe (U.2/U.3)
  - M.2 boot support
- **Expansion:**
  - Up to 8x PCIe Gen 4 slots
  - 1x OCP 3.0 slot
  - Up to 3x double-width or 8x single-width GPUs
- **Power:** Dual-redundant PSUs (750W to 1800W)
- **Management:** Lenovo XClarity Controller
- **OS Support:** Windows Server, RHEL, SUSE, VMware, others

---

## ⚙️ Deployment Tips

1. **Install CPUs & RAM**
   - Match CPU specs (same model/speed).
   - Populate DIMMs according to Lenovo's memory population rules.

2. **Configure Storage**
   - Choose between HDDs, SSDs, or NVMe depending on workload.
   - RAID configuration via onboard RAID controller or add-on card.

3. **Set Up Network**
   - Use OCP 3.0 slot for dedicated NIC.
   - Add PCIe NICs as needed (10G/25G/40G/100G supported).

4. **Enable Remote Management**
   - Use [Lenovo XClarity Controller (xcc)](https://pubs.lenovo.com/lxcc-overview) for firmware updates, monitoring, remote console.

5. **Install OS**
   - Use virtual media or PXE boot to install desired OS.
   - Optionally set up RAID 1 for M.2 boot drives.

---

## ⚠️ Considerations

- **Noise:** Can be loud in non-data center environments.
- **Power:** Ensure rack power capacity supports high-TDP CPUs and GPUs.
- **Firmware:** Keep UEFI and XClarity Controller firmware up-to-date.

---

## 🔧 Resources

- [Lenovo ThinkSystem SR650 V2 Product Guide](https://lenovopress.lenovo.com/lp1392)
- [Firmware & Drivers](https://support.lenovo.com)
- [XClarity Controller Info](https://datacentersupport.lenovo.com/solutions/ht505301)

---

## 📦 Example Use Cases

| Use Case       | Recommended Config                         |
| -------------- | ------------------------------------------ |
| Virtualization | Dual Xeon Silver, 512GB RAM, 10G NIC       |
| AI Inference   | Dual Xeon Gold, 256GB RAM, 2x A100 GPUs    |
| SDS (Ceph)     | Dual Xeon Silver, 1TB RAM, 24x NVMe Drives |

---

## 📄 Version Info

**Guide Version:** 1.0  
**Last Updated:** July 10, 2025
