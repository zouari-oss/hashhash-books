# NAT Address Types: ALI, AGI, ALE, AGE

This document explains the four NAT address types commonly used to differentiate between internal and external addresses in a network.

## 1️⃣ ALI – Internal Local Address (Adresse Locale Interne)

**Definition:**  
The source address as seen from the internal network.

**Details:**

- Private IP address of the host inside the LAN.
- Example: `192.168.1.10`

## 2️⃣ AGI – Internal Global Address (Adresse Globale Interne)

**Definition:**  
The NAT-translated version of the ALI, as seen from the external network.

**Details:**

- Public IP address used on the Internet after source NAT.
- Example: `102.45.12.8`

**Relation:**

```

ALI → AGI = Source NAT (outbound translation)

```

## 3️⃣ ALE – External Local Address (Adresse Locale Externe)

**Definition:**  
The destination address as perceived from the internal network.

**Details:**

- External host’s IP address before destination translation.
- Example: `142.251.36.14` (Google as seen from the LAN)

## 4️⃣ AGE – External Global Address (Adresse Globale Externe)

**Definition:**  
The destination address as seen from the external network.

**Details:**

- Real, globally routable IPv4 address of the host on the Internet.
- Example: `142.251.36.14` (actual public address)

## 🧩 Summary Table

| Term | Meaning                 | Direction            | Viewed from…    | Example       |
| ---- | ----------------------- | -------------------- | --------------- | ------------- |
| ALI  | Internal Local Address  | Source               | Inside network  | 192.168.1.10  |
| AGI  | Internal Global Address | Source (after NAT)   | Outside network | 102.45.12.8   |
| ALE  | External Local Address  | Destination          | Inside network  | 142.251.36.14 |
| AGE  | External Global Address | Destination (actual) | Outside network | 142.251.36.14 |

## 📘 Simple Interpretation

- **ALI → AGI** = NAT of the source (internal → external)
- **ALE → AGE** = NAT of the destination (perceived internal → actual external)

## Optional: Packet Flow Diagram (ASCII)

```
LAN (Internal)                  NAT Router                  Internet (External)
+--------------+               +------------+              +--------------------+
| Source:      |  ALI          | Translated |  AGI         | Destination        |
| 192.168.1.10 |-------------->| 102.45.12.8|------------->| AGE: 142.251.36.14 |
| Destination  | ALE           |            |              |                    |
| 142.251.36.14|<--------------|            |<-------------|                    |
+--------------+               +------------+              +--------------------+
```
