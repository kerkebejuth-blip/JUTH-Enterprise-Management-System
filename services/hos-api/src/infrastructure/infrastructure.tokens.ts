/** Runtime dependency injection tokens for domain kernel infrastructure bindings. */
export const INFRASTRUCTURE_TOKENS = {
  clock: Symbol('JUTH_HOS_CLOCK'),
  identifierGenerator: Symbol('JUTH_HOS_IDENTIFIER_GENERATOR'),
  domainEventPublisher: Symbol('JUTH_HOS_DOMAIN_EVENT_PUBLISHER'),
  domainEventDispatcher: Symbol('JUTH_HOS_DOMAIN_EVENT_DISPATCHER'),
  transactionManager: Symbol('JUTH_HOS_TRANSACTION_MANAGER'),
  unitOfWork: Symbol('JUTH_HOS_UNIT_OF_WORK'),
  repositoryFactory: Symbol('JUTH_HOS_REPOSITORY_FACTORY'),
} as const;
