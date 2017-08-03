/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var ROOT_NAMESPACE = 'org.example.subrogation';

var USER = ROOT_NAMESPACE + '.User';
var ADMIN = ROOT_NAMESPACE + '.Admin';
var POLICY_HOLDER = ROOT_NAMESPACE + '.PolicyHolder';
var AGENT = ROOT_NAMESPACE + '.Agent';
var ADJUSTOR = ROOT_NAMESPACE + '.Adjustor';

var CLAIM = ROOT_NAMESPACE + '.Claim';
var POLICY = ROOT_NAMESPACE + '.Policy';

var STATUS_UPDATE_EVENT = ROOT_NAMESPACE + '.StatusUpdateEvent';

/**
 * Bootstrap various objects for convenience.
 *
 * @param {org.example.subrogation.Bootstrap} txn -- Bootstrap transaction
 * @transaction
 */
function onBootstrap(txn) {
    var admins = [];
    var adjustors = [];
    var agents = [];
    var policyHolders = [];
    var policies = [];
    var claims = [];
    var factory = getFactory();
    var claimCounter = 1;

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

    var gecko = factory.newResource(ROOT_NAMESPACE,
                                    'Agent',
                                    'gecko@example.com');
    gecko.firstName = "Gecko";
    gecko.lastName = "Geiko";
    gecko.password = "15 minutes could save 15% or more";
    gecko.title = "Senior Insurance Agent";
    gecko.company = 'GEIKO_CORP';
    agents.push(gecko);

    var duck = factory.newResource(ROOT_NAMESPACE,
                                   'Agent',
                                   'duck@example.com');
    duck.firstName = "Duck";
    duck.lastName = "Aflack";
    duck.password = "aflack aflack aflack";
    duck.title = "Lead Insurance Agent";
    duck.company = 'AFLACK_CORP';
    agents.push(duck);

    var peyton = factory.newResource(ROOT_NAMESPACE,
                                     'Agent',
                                     'peyton.manning@example.com');
    peyton.firstName = "Peyton";
    peyton.lastName = "Manning";
    peyton.password = "nationwide is on your side";
    peyton.title = "Celebrity Insurance Agent";
    peyton.company = 'NATIONWIDE_CORP';
    agents.push(peyton);

    var alfred = factory.newResource(ROOT_NAMESPACE,
                                     'Agent',
                                     'alfred.pennyworth@example.com');
    alfred.firstName = "Alfred";
    alfred.lastName = "Pennyworth";
    alfred.password = "Gotham needs you";
    alfred.title = "Insurance Agent and butler";
    alfred.company = 'WAYNE_ENTERPRISES';
    agents.push(alfred);

    // Policy Holders
    var batman = factory.newResource(ROOT_NAMESPACE,
                                     'PolicyHolder',
                                     'batman@example.com');
    batman.firstName = "Bruce";
    batman.lastName = "Wayne";
    batman.password = "holy blockchain, robin!"
    batman.policies = [];
    policyHolders.push(batman);

    var superman = factory.newResource(ROOT_NAMESPACE,
                                       'PolicyHolder',
                                       'superman@example.com');
    superman.firstName = "Clark";
    superman.lastName = "Kent";
    superman.password = "up, up, and away!";
    superman.policies = [];
    policyHolders.push(superman);

    var spiderman = factory.newResource(ROOT_NAMESPACE,
                                        'PolicyHolder',
                                        'spiderman@example.com');
    spiderman.firstName = "Peter";
    spiderman.lastName = "Parker";
    spiderman.password = "itsy bitsy spider climbed up the water spout";
    spiderman.policies = [];
    policyHolders.push(spiderman);

    var mcqueen = factory.newResource(ROOT_NAMESPACE,
                                      'PolicyHolder',
                                      'lightning.mcqueen@example.com');
    mcqueen.firstName = "Lightning";
    mcqueen.lastName = "McQueen";
    mcqueen.password = "Speed. I am speed."
    mcqueen.policies = [];
    policyHolders.push(mcqueen);

    // Adjustors
    var ali = factory.newResource(ROOT_NAMESPACE,
                                  'Adjustor',
                                  'ali.brent@example.com')
    ali.firstName = "Ali";
    ali.lastName = "Brent";
    ali.password = "clean the mess created by the Good Supers";
    ali.title = "Adjustor for Good Supers";
    adjustors.push(ali);

    // Policies
    var p1 = factory.newResource(ROOT_NAMESPACE, 'Policy', 'P1');
    p1.policyType = 'AUTO';
    p1.company = 'WAYNE_ENTERPRISES';
    p1.policyHolder = factory.newRelationship(ROOT_NAMESPACE,
                                              'PolicyHolder',
                                              'batman@example.com');
    var p1FKey = factory.newRelationship(ROOT_NAMESPACE,
                                        'Policy',
                                        'P1');
    batman.policies.push(p1FKey);
    policies.push(p1);

    var p2 = factory.newResource(ROOT_NAMESPACE, 'Policy', 'P2');
    p2.policyType = 'VISION';
    p2.company = 'AFLACK_CORP';
    p2.policyHolder = factory.newRelationship(ROOT_NAMESPACE,
                                              'PolicyHolder',
                                              'superman@example.com');
    var p2FKey = factory.newRelationship(ROOT_NAMESPACE,
                                        'Policy',
                                        'P2');
    superman.policies.push(p2FKey);
    policies.push(p2);

    var p3 = factory.newResource(ROOT_NAMESPACE, 'Policy', 'P3');
    p3.policyType = 'MEDICAL';
    p3.company = 'GEIKO_CORP';
    p3.policyHolder = factory.newRelationship(ROOT_NAMESPACE,
                                              'PolicyHolder',
                                              'spiderman@example.com');
    var p3FKey = factory.newRelationship(ROOT_NAMESPACE,
                                        'Policy',
                                        'P3');
    spiderman.policies.push(p3FKey);
    policies.push(p3);

    var p4 = factory.newResource(ROOT_NAMESPACE, 'Policy', 'P4');
    p4.policyType = 'AUTO';
    p4.company = 'ACME_CORP';
    p4.policyHolder = factory.newRelationship(ROOT_NAMESPACE,
                                              'PolicyHolder',
                                              'mcqueen@example.com');
    var p4FKey = factory.newRelationship(ROOT_NAMESPACE,
                                        'Policy',
                                        'P4');
    mcqueen.policies.push(p4FKey);
    policies.push(p4);

    // Claims
    var bossmanForeignKey = factory.newRelationship(ROOT_NAMESPACE,
                                                    'Admin',
                                                    'bobby.da.boss@example.com');

    var c1 = factory.newResource(ROOT_NAMESPACE, 'Claim', 'C1')
    c1.status = 'INIT';
    c1.policy = factory.newRelationship(ROOT_NAMESPACE, 'Policy', 'P1');
    c1.createdAt = txn.timestamp;
    c1.createdBy = bossmanForeignKey;
    claims.push(c1);

    var c2 = factory.newResource(ROOT_NAMESPACE, 'Claim', 'C2')
    c2.status = 'INIT';
    c2.policy = factory.newRelationship(ROOT_NAMESPACE, 'Policy', 'P2');
    c2.createdAt = txn.timestamp;
    c2.createdBy = bossmanForeignKey;
    claims.push(c2);

    var c3 = factory.newResource(ROOT_NAMESPACE, 'Claim', 'C3')
    c3.status = 'INIT';
    c3.policy = factory.newRelationship(ROOT_NAMESPACE, 'Policy', 'P3');
    c3.createdAt = txn.timestamp;
    c3.createdBy = bossmanForeignKey;
    claims.push(c3);

    var c4 = factory.newResource(ROOT_NAMESPACE, 'Claim', 'C4')
    c4.status = 'INIT';
    c4.policy = factory.newRelationship(ROOT_NAMESPACE, 'Policy', 'P4');
    c4.createdAt = txn.timestamp;
    c4.createdBy = bossmanForeignKey;
    claims.push(c4);

    return getParticipantRegistry(ADMIN)
           .then(function(adminRegistry) {
               return adminRegistry.addAll(admins);
           })
           .then(function() {
               return getParticipantRegistry(AGENT);
           })
           .then(function(agentRegistry) {
               return agentRegistry.addAll(agents);
           })
           .then(function() {
               return getParticipantRegistry(ADJUSTOR);
           })
           .then(function(adjustorRegistry) {
               return adjustorRegistry.addAll(adjustors);
           })
           .then(function() {
               return getParticipantRegistry(POLICY_HOLDER);
           })
           .then(function(policyHolderRegistry) {
               return policyHolderRegistry.addAll(policyHolders);
           })
           .then(function() {
               return getAssetRegistry(POLICY);
           })
           .then(function(policyRegistry) {
               return policyRegistry.addAll(policies);
           })
           .then(function() {
               return getAssetRegistry(CLAIM);
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


function dispatchStatusUpdateEvent(txn, oldStatus) {
      var event = getFactory().newEvent(ROOT_NAMESPACE, 'StatusUpdateEvent');
      event.txnReference = txn;
      event.oldStatus = oldStatus;
      event.newStatus = txn.claim.status;
      emit(event);
}


/**
 * Assigns specified primary agent to the specified Claim. When a new primary
 * agent is assigned to a Claim, it's status changes to UNDER_REVIEW as new
 * set of eyes will be looking at the Claim.
 *
 * @param {org.example.subrogation.AssignPrimaryAgent} txn -- AssignPrimaryAgent transaction
 * @transaction
 */
function onAssignPrimaryAgent(txn) {
    if (!txn.primaryAgent) {
        throw new Error("Illegal Argument: 'primaryAgent' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    var claimPolicy = txn.claim.policy;
    if (!claimPolicy) {
        throw new Error("Invalid State: Claim is not associated with a policy");
    }

    if (txn.primaryAgent.company != claimPolicy.company) {
        throw new Error("Invalid State: Primary Agent must be an employee of " +
                        policyCompany);
    }

    var oldStatus = txn.claim.status;
    txn.claim.primaryAgent = txn.primaryAgent;
    txn.claim.status = 'UNDER_REVIEW';
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Updates the RecoveryType of the specified Claim.
 *
 * @param {org.example.subrogation.UpdateRecoveryType} txn -- UpdateRecoveryType transaction
 * @transaction
 */
function onUpdateRecoveryType(txn) {
    if (!txn.recoveryType) {
        throw new Error("Illegal Argument: 'recoveryType' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if (txn.claim.status != 'UNDER_REVIEW') {
        throw new Error("Invalid State: Claim's status must be 'UNDER_REVIEW' " +
                        " to be able to update the RecoveryType");
    }

    var oldStatus = txn.claim.status;
    txn.claim.recoveryType = txn.recoveryType;
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Assesses the recovery cost by updating the assessedTotalCost and
 * assessedCoverage fields of the specified claim.
 *
 * @param {org.example.subrogation.AssessRecoveryCost} txn -- AssessRecoveryCost transaction
 * @transaction
 */
function onAssessRecoveryCost(txn) {
    if (!txn.totalCost) {
        throw new Error("Illegal Argument: 'totalCost' must be specified");
    }

    if (!txn.coverage) {
        throw new Error("Illegal Argument: 'coverage' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if (txn.claim.status != 'UNDER_REVIEW') {
        throw new Error("Invalid State: Claim's status must be 'UNDER_REVIEW' " +
                        " to be able to assess the recovery cost");
    }

    var oldStatus = txn.claim.status;
    txn.claim.assessedTotalCost = txn.totalCost;
    txn.claim.assessedCoverage = txn.coverage;
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Assigns counter-party agent to the Claim and sets the status to REVIEW.
 *
 * @param {org.example.subrogation.AssignCounterParty} txn -- AssignCounterParty transaction
 * @transaction
 */
function onAssignCounterParty(txn) {
    if (!txn.counterPartyAgent) {
        throw new Error("Illegal Argument: 'counterPartyAgent' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if (txn.claim.status != 'UNDER_REVIEW') {
        throw new Error("Invalid State: Claim was not reviewed to be " +
                        " assigned to the counter-party");
    }

    if (!txn.counterPartyAgent.company) {
        throw new Error("Invalid State: 'counterPartyAgent' must belong to " +
                        " a company");
    }

    var claimPolicy = txn.claim.policy;
    if (!claimPolicy) {
        throw new Error("Invalid State: Claim is not associated with a policy");
    }

    if (txn.counterPartyAgent.company == claimPolicy.company) {
        throw new Error("Invalid State: Counter-party agent must be from a " +
                        " different company");
    }

    var oldStatus = txn.claim.status;
    txn.claim.counterPartyAgent = txn.counterPartyAgent;
    txn.claim.status = 'UNDER_COUNTER_PARTY_REVIEW';
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Updates the status of the Claim. The status of the Claim can be changed to
 * UNDER_REVIEW to reevaluate the Claim.
 *
 * @param {org.example.subrogation.UpdateClaimStatus} txn -- UpdateClaimStatus transaction
 * @transaction
 */
function onUpdateClaimStatus(txn) {
    if (!txn.status) {
        throw new Error("Illegal Argument: 'status' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if ((txn.status == 'INIT')     ||
        (txn.status == 'ADJUST') ||
        (txn.status == 'ADJUSTED') ||
        (txn.status == 'UNDER_COUNTER_PARTY_REVIEW')) {
        throw new Error("Illegal Argument: Invalid status specified");
    }

    if (!txn.claim.primaryAgent) {
        throw new Error("Invalid State: Primary insurance's agent is not yet " +
                        " assigned to the claim");
    }

    if (txn.status == 'ACCEPTED') {
        txn.claim.totalCost = txn.claim.assessedTotalCost;
        txn.claim.coverage = txn.claim.assessedCoverage;
    }

    var oldStatus = txn.claim.status;
    txn.claim.status = txn.status;
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Assigns an adjustor to the Claim.
 *
 * @param {org.example.subrogation.AssignAdjustor} txn -- AssignAdjustor transaction
 * @transaction
 */
function onAssignAdjustor(txn) {
    if (!txn.adjustor) {
        throw new Error("Illegal Argument: 'adjustor' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if (txn.claim.status != 'UNDER_COUNTER_PARTY_REVIEW') {
        throw new Error("Invalid State: Claim was not under counter-party " +
                        " review to be assigned to an adjustor");
    }

    var oldStatus = txn.claim.status;
    txn.claim.adjustor = txn.adjustor;
    txn.claim.status = 'ADJUST';
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Adjusts the recovery cost on a Claim.
 *
 * @param {org.example.subrogation.AdjustRecoveryCost} txn -- AdjustRecoveryCost transaction
 * @transaction
 */
function onAdjustRecoveryCost(txn) {
    if (!txn.totalCost) {
        throw new Error("Illegal Argument: 'totalCost' must be specified");
    }

    if (!txn.coverage) {
        throw new Error("Illegal Argument: 'coverage' must be specified");
    }

    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if (txn.claim.status != 'ADJUST') {
        throw new Error("Invalid State: Claim was not assigned to an adjustor");
    }

    var oldStatus = txn.claim.status;
    txn.claim.adjustedTotalCost = txn.totalCost;
    txn.claim.adjustedCoverage = txn.coverage;
    txn.claim.status = 'ADJUSTED';
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}

/**
 * Accepts the adjusted recovery cost of the Claim.
 *
 * @param {org.example.subrogation.AcceptAdjustedRecoveryCost} txn -- AcceptAdjustedRecoveryCost transaction
 * @transaction
 */
function onAcceptAdjustedRecoveryCost(txn) {
    if (!txn.claim) {
        throw new Error("Illegal Argument: 'claim' must be specified");
    }

    if (txn.claim.status != 'ADJUSTED') {
        throw new Error("Invalid State: Claim has not yet been adjusted");
    }

    var oldStatus = txn.claim.status;
    txn.claim.totalCost = txn.claim.adjustedTotalCost;
    txn.claim.coverage = txn.claim.adjustedCoverage;
    txn.claim.status = 'ACCEPTED';
    txn.claim.lastUpdatedAt = txn.timestamp;
    txn.claim.lastUpdatedBy = getCurrentParticipant();

    return getAssetRegistry(CLAIM)
          .then(function(claimRegistry) {
              dispatchStatusUpdateEvent(txn, oldStatus);
              claimRegistry.update(txn.claim);
          }
    );
}
