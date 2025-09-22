# 📡 IP Broadcast Types: Limited vs Directed

In IP networking, **broadcasting** refers to sending a packet to **all hosts** on a network. There are two main types of broadcast addresses in IPv4:

## 1. 🌐 Limited Broadcast (`255.255.255.255`)

### 🔸 Description

- A **limited broadcast** is sent to **all hosts on the local network**.
- It **never leaves the local subnet**—routers will **not forward** these packets.
- Commonly used when a device **doesn’t yet have an IP address**.

### 🔸 Key Characteristics

| Property | Value                        |
| -------- | ---------------------------- |
| Address  | `255.255.255.255`            |
| Scope    | Local subnet only            |
| Routable | ❌ No                        |
| Use case | DHCP Discover, bootstrapping |
| TTL      | Typically 1                  |

### 🧪 Example Use Case

When a computer first connects to the network and doesn't have an IP address, it sends a **DHCP Discover** to `255.255.255.255`.

## 2. 🎯 Directed Broadcast (`<network>.255`)

### 🔸 Description

- A **directed broadcast** is sent to **all hosts on a specific remote subnet**.
- It’s routed like a normal IP packet to the target network, then **broadcast within that network**.
- Often **blocked by routers/firewalls** due to security risks (e.g. **Smurf attacks**).

### 🔸 Key Characteristics

| Property | Value                                     |
| -------- | ----------------------------------------- |
| Address  | E.g. `192.168.1.255` for `192.168.1.0/24` |
| Scope    | Specific destination subnet               |
| Routable | ✅ Yes (if allowed by routers)            |
| Use case | Wake-on-LAN, network-wide alerts          |
| TTL      | Can be >1                                 |

### 🧪 Example Use Case

A server sends a message to `192.168.11.255` to reach **all hosts** in the `192.168.11.0/24` network.

## 🆚 Summary Table

| Feature               | Limited Broadcast       | Directed Broadcast                     |
| --------------------- | ----------------------- | -------------------------------------- |
| Address               | `255.255.255.255`       | `<network>.255` (e.g. `192.168.1.255`) |
| Scope                 | Local network only      | Specific subnet (even remote)          |
| Forwarded by routers? | ❌ No                   | ✅ Yes (if permitted)                  |
| Routable              | ❌ No                   | ✅ Yes                                 |
| Common Usage          | DHCP, initial discovery | Wake-on-LAN, subnet-wide messages      |

## ⚠️ Security Notes

- **Directed broadcasts are often disabled** on routers due to their historical abuse in **DDoS amplification attacks**.
- **Limited broadcasts are safe** but are not useful beyond the local segment.

## ✅ Key Takeaways

- Use **limited broadcast** (`255.255.255.255`) for local-only, discovery-type traffic.
- Use **directed broadcast** (`<network>.255`) to target all devices on a **specific subnet**, if allowed.
