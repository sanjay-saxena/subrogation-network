# subrogation-network

In order to create an Insurance Subrogation app that is backed by Blockchain, you need to install the following:

 * [Docker](https://www.docker.com/) version 17.03 or later
 * [Docker-compose](https://docs.docker.com/compose/) version 1.11.2 or later
 * [Node.js](https://nodejs.org/en/) version 6.10.X
 * [npm](https://www.npmjs.com/) version 4.4.4 or later
 * [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/latest/) version 1.0
 * [Hyperledger Composer](https://hyperledger.github.io/composer/introduction/introduction.html) version 0.10.1 or later
 * [Yeoman](http://yeoman.io/) Generator version 1.8.5 or later


Once you have Docker and Docker-compose installed, you can download and and start Hyperledger Fabric v1.0 as shown below:

```
$ cd ~/Workdir
$ git clone https://github.com/sanjay-saxena/subrogation-network
$ cd ~/Workdir/subrogation-network
$ npm install
$ ./fabric-tools/downloadHyperledger.sh
$ ./fabric-tools/startFabric.sh
$ ./scripts/importAdminIdentity.sh
```

Hyperledger Composer provides higher-level abstractions to hide the complexity of the blockchain technologies that are implemented as part of Hyperledger Fabric. A Blockchain app that is built by Hyperledger Composer relies on a `Business Network` as an abstraction that helps orchestrate the transfer of assets. A `Business Network` comprises of `Business Model`, `Business Logic`, and `Access Control Lists`.

The following sections provide the steps for creating the Insurance Subrogation app backed by Blockchain. The Business Network is extremely simple and does not have support for authentication or authorization and so it will only contain the `Business Model` and `Business Logic` and there is no `Access Control Lists` defined in the network. The repo includes some scripts for creating a Business Network Archive(.bna), deploying the archive to Hyperledger Fabric, etc. for convenience.

## Define a Business Model

Business Model consists of `Participants`, `Assets`, `Transactions`, and `Events`. It is expressed using a Domain Specific Language called [Concerto](https://hyperledger.github.io/composer/reference/cto_language.html). A very simple business model for Subrogation is defined in [models/subrogation.cto](./models/subrogation.cto).


## Implement Business Logic

Hyperledger Composer allows Business Logic to be implemented using Javascript and provides a rich set of APIs to update and query the world state.

The business logic for the Subrogation Business Network is implemented in [lib/logic.js](./lib/logic.js). For each of the transaction types that are defined in the model, there is a corresponding transaction processor function that implements the business logic for that transaction.

For example, when the `Bootstrap` transaction is submitted, Hyperledger Composer runtime will eventually invoke the following `onBootstrap()` function:

```
/**
 * Bootstrap the world state for convenience.
 * @param {org.example.subrogation.Bootstrap} txn -- Bootstrap transaction
 * @transaction
 */
function onBootstrap(txn) {
    ....

    var factory = getFactory();

    // Admin
    var bossman = factory.newResource(ROOT_NAMESPACE,
                                      'Admin',
                                      'bobby.da.boss@example.com');
    bossman.firstName = "Bobby";
    bossman.lastName = "Da Boss";
    bossman.password = "u talkin' to me?";
    admins.push(bossman);

    // Insurance Agents
    var mr_incredible = factory.newResource(ROOT_NAMESPACE,
                                            'Agent',
                                            'mr.incredible@example.com');
    mr_incredible.firstName = "Bob";
    mr_incredible.lastName = "Parr";
    mr_incredible.password = "family-man-of-steel";
    mr_incredible.title = "Principal Insurance Agent";
    mr_incredible.company = 'ACME_CORP';
    agents.push(mr_incredible);

    ....

    return getParticipantRegistry('org.example.subrogation.Agents')
           .then(function(agentRegistry) {
               return agentRegistry.addAll(agents);
           })
           .then(function() {
               return getAssetRegistry('org.example.subrogation.Claim');
           })
           .then(function(claimRegistry) {
               return claimRegistry.addAll(claims);
           })
          .catch(function (error) {
              console.log(error);
              throw error;
          })
    ;
}
```

which implements the business logic for `Bootstrap` transaction. Similarly, the business logic for other transactions is implemented in their corresponding transaction-processor functions which eventually update the world state.

## Create Business Network Archive

Once the Business Model and Business Logic is ready, they can be packaged up in a Business Network Archive(.bna) as shown below:

```
$ cd ~/Workdir/subrogation-network
$ ./scripts/createArchive.sh
```

This will result in the creation of `subrogation-network.bna`.

## Deploy Business Network Archive

Assuming that Hyperleder Fabric is running, here is the step to deploy `subrogation-network.bna` to it:

```
$ cd ~/Workdir/subrogation-network
$ ./scripts/deploy.sh
```

## Submit Bootstrap Transaction

In order to populate the world state for convenience, the `Bootstrap` transaction can be submitted as shown below:

```
$ cd ~/Workdir/subrogation-network
$ ./scripts/bootstrapTransaction.sh
```

You can use `./scripts/list.sh` to look at the assets that were created by the `Bootstrap` transaction.

## Generate Angular2 app

First, install the generator as shown below:

```
$ npm install -g generator-hyperledger-composer
```

Here is the step to generate the Angular2 app for Subrogation using Yeoman:

```
$ cd ~/Workdir/subrogation-network
$ yo hyperledger-composer:angular

Welcome to the Hyperledger Composer Angular2 skeleton app generator
? Do you want to connect to a running Business Network? Yes
? What is the name of the application you wish to generate?: angular-app
? Description of the application: Skeleton Hyperledger Composer Angular2 project
? Author name: xxxx xxxxx
? Author email: foo@example.com
? What is the Business Network Identifier?: subrogation-network
? What is the Connection Profile to use? hlfv1
? Enrollment id: admin
? Enrollment Secret: adminpw
Configuring: angular-app
About to start creating files
About to connect to a running business network
Connected to: subrogation-network

....
```

This will result in the generation of Subrogation app in the `angular-app` sub-folder.

## Run Subrogation  Angular2 App

You can run the app as shown below:

```
$ cd ~/Workdir/subrogation-network
$ cd angular-app
$ npm start

````

The app will be compiled and you can eventually interact with it by pointing your browser to `http://localhost:4200`. Also, you can look and play with the generated REST APIs or endpoints by
pointing your browser to the Loopback Explorer at `http://localhost:3000/explorer`. You can
also exercise the REST API to retrieve all the Tasks that were created by the
`Bootstrap` transaction by pointing your browser to `http://localhost:3000/api/Task` to
receive JSON response containing all the tasks in the world state.
