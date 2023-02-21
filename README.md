# RiteOfMoloch-v1.0
White label ROM

# Deployment Info

### There are 3+ mock cohorts deployed through this factory.

Factory Goerli creation block number: 8489001

Factory Goerli address: [0xf8edb679b7d994fc8bf93502d69d31c23d94181f](https://goerli.etherscan.io/address/0xf8edb679b7d994fc8bf93502d69d31c23d94181f)

Subgraph endpoint: https://api.studio.thegraph.com/query/40280/rom-test/v0.0.15


# Conceptual Overview
## Background
Rite Of Moloch relies heavily on the following packages. Understanding them will greatly assist in understanding this project.
- [Hats Protocol](https://github.com/Hats-Protocol)
- [Moloch v3 / Baal](https://moloch.daohaus.fun/)
## Moloch v3 DAOs & Shaman privileges

![diagram-2](https://user-images.githubusercontent.com/91401566/220282702-05dbd7ff-735c-4771-8a13-f1e5e4000547.jpeg)

While it is optional for a DAO to give Shaman privileges, ROM functionality will be restricted if this does not take place.

If the ROM contract is not given Shaman privileges, any direct, state changing call made to  ```baalDao.mintshares()``` will revert. That is, the Admin hat wearers of that ROM instance cannot mint shares.

## Minting Admin hats to nominated admin EOAs 
![diagram-1](https://user-images.githubusercontent.com/91401566/220277011-cc0b0084-384e-41a3-95ab-637de55c7a8d.jpeg)

- A "Hat" is essentially a tokenised role within an Access Control scheme. 

- "Hat wearers" gain the privileges defined for the Hat that they wear. 

- ROM mints hats for access control purposes of the ROM protocol itself, as well to admins designated by DAOs to oversee their ROM instances.

- Hats have a tree like hierarchical structure

- "Top hat" is the root node of the hats. Top hat can modify hats at any level of the tree. Other nodes can only modify hats immediately below them.

- The Top hat is issued to DAO. Up to 3 Admin hats under the top hat will be issued to EOAs selected by the DAO.

- DAOs can also Bring Their Own Hat, and lend it to ROM to mint Admin hats instead of creating a new Top Hat. 

- Admin hat wearers can modify parameters of ROM contracts, as well as resetting the ROM contract state to start a new cohort.
