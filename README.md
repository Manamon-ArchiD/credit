# Credit

Service de crédit pour **Manamon**.

## Ressources gérées
- **Solde de crédits des utilisateurs**  
- **Historique des transactions financières liées aux crédits**

## Technologies
- **Java avec Spring Boot**
- **Stockage : PostgreSQL**
- **Envoi des statistiques via un bus de messages : RabbitMQ**

## Principales fonctionnalités API
- **GET /credit/{userId}**  
  Obtenir le solde de crédits d’un utilisateur.

- **POST /credit/update**  
  Mettre à jour le solde après une transaction (achat, gain de match, vente).

- **GET /credit/{userId}/transactions**  
  Récupérer l’historique complet des transactions pour un utilisateur.
