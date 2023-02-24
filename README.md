# HR for DAOs: RiteOfMoloch-v1.0
Rite of Moloch (RoM) v.1 is an example of a solution that allows for white labelling. The deployed factory allows multiple DAOs to use the same smart contract factory, while deploying cohorts only they are able to control, manage, and track. We set out to solve the issue of contributor committment and delivery by formalising contribution structure through the introduction of a bond. In other words, if a an individual wants to become a member they can proclaim this goal, stake a set amount of funds, and work towards their goal. In the case of failure, the funds are slashed and forwarded to the treasury of the DAO.

At the same time, not having a discrete number of contributors in charge of contribution management, onboarding new members fails. For this reason, RoM offers a cohort and member tracking functionality to keep on top of your DAO's health. The permissions of the administrators are managed through the HATs protocol and cohorts themselves are made reusable by the integration of DAOHaus v.3 manager shamans.

Our frontend enables you a head start and provides you with all the core functionalities needed to take charge of your DAO HR. No HR person or corporate software needed. Slay moloch! ⚔️ In the following we provide technical details of the implementation and interfaces.

# What Is Rite of Moloch?

Rite of Moloch is a modular staking app. It lets users create a cohort, which is an instance of a BaalV3 DAO. <a href='https://moloch.daohaus.fun/tools/'>(Baal Moloch DAO documentation)</a>. Prospective DAO members can stake to cohorts. After successfully staking cohort members will receive a soulbound token (SBT).

When cohort members meet the criteria to join the DAO, they can receive their stake back. Otherwise Moloch will "sacrifice" them and their stake will be given back to the treasury!

The reason for creating cohorts is to build rapport and commitment among prospective initiates looking to join your DAO. One of the problems DAO's face is a lack of commitment from members.

Commit financial resources to a task is a proven way to increase commitment. Commit your stake, and you shall receive your assets back after fulfilling your duties to the organization you wish to join!

# How To Use This App

-Connect to the app with your favorite Web3 wallet
-Select your role: Cohort Member or Administrator.
-Cohort members are prospective DAO members.
-Administrators have special rights. On the smart contract, these rights include features such as adding or removing new admin. On the frontend of this app, these features include viewing data about individual cohorts, as well as viewing the metrics dashboard. On the metrics dashboard you can select up to 3 different cohorts and compare statistics over time. You can also select a view of an aggregate of all cohorts (and compare your cohort to the overall performance).

## Cohort Member features of this app:

This feature can be accessed by navigating from the home screen --> Cohort Member.

From here you'll see a list of cohorts which have been deployed from the Rite of Moloch factory contract. Select the cohort you'd like to join, click the "stake" button, then commit your stake.

If you've staked to a cohorts, when you visit the staking page, you can see the deadline that you have to become a member. If you've become a member and are eligible to receive your stake back, you can do so from this page.

## Administrative features of this app:

### Creating a new cohort:

This feature can be accessed by navigating from the home screen --> Admin --> Deploy Cohort.

When creating a cohort, these are the parameters available to you:

Form part 1:
-Name of cohort/
-Moloch DAO address (this is the "parent" DAO of new cohorts that are created).
-Name SBT: the name of the soulbound token.
-SBT symbol: the token symbol.
-URL SBT: the URI of the image you'd like to use for the soulbound token.

Form part 2:
-Required stake: the amount of the asset prospective cohort members need to stake if they'd like to join. (You can set any ERC20 asset).
-Cohort size: the maximum size of the cohort.
-Minimum shares: the amount of shares required to become a member of the DAO.
-Onboarding period: the length of time of the cohort. After this time period ends, cohort members who did not meet the criteria for membership can have their stake slashed, and automatically deposited to the DAO's treasury.
-Staking asset address: the address of the asset cohort members need to stake. (Can be any ERC20 address).
-Stake duration: The minimum length of time that cohort members must stake before being eligible to have their stake returned.
-Treasury address: the address where cohort members' funds will be sent if their stake gets slashed!

Form part 3:
-Does the DAO have a TOP HAT: Rite of Moloch integrates with HATS protocol. <a href="https://hackmd.io/@spengrah/H15lKdsmc" alt='HATS Protocol documentation'>Read more about HATS protocol here</a>.
-Add additional administrators: This allows you to add up to 2 admin. Admin receive privileges such as the ability to slash members, and use the analytics dashboard to view cohort metrics.
-Make contract a Shaman: by selecting true, the new cohort (Rite of Moloch contract instance) received shaman manager privileges to mint minimum shares for DAO members.

### Manage Cohorts

This feature can be accessed by navigating from the home screen --> Admin --> Manage Cohorts.

This lets you view a list of cohorts that have been deployed from the Rite of Moloch Factory contract. Click into an individual cohort and view all members which are staked.

If members are eligible to be slashed (e.g. if the deadline has passed and they haven't become DAO members), administrators have the right to slash their stake.

### Metrics

This feature can be accessed by navigating from the home screen --> Admin --> Metrics.

Here can you view the performance of up to 3 cohorts over time. You can also view "overall" performance, which is a data aggregate of every cohort which has been created from the factory contract.

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

If the ROM contract is not given Shaman privileges, any direct, state changing call made to `baalDao.mintshares()` will revert. That is, the Admin hat wearers of that ROM instance cannot mint shares.

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

# How to contribute to this repository:

-Make a PR and your contribution will be reviewed by the Rite of Moloch team
-The best way is to apply to join Raid Guild (https://RaidGuild.org), stake to an upcoming cohort and become a member of the Raid Guild DAO.

May Moloch be on your side...
