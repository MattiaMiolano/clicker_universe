/*
   sabato 22 ottobre 202201:37:51
   Utente: 
   Server: DESKTOP-QLVI9N2\SQLEXPRESS
   Database: clicker_universe_prototype
   Applicazione: 
*/

/* Per evitare potenziali problemi di perdita di dati, si consiglia di esaminare dettagliatamente lo script prima di eseguirlo al di fuori del contesto di Progettazione database.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.RefreshTokens
	(
	Id int NOT NULL IDENTITY (1, 1),
	Token nvarchar(MAX) NOT NULL,
	Expires date NOT NULL,
	Created date NOT NULL,
	CreatedByIp nvarchar(255) NOT NULL,
	Revoked date NULL,
	RevokedByIp nvarchar(255) NULL,
	ReplacedByToken nvarchar(255) NULL,
	ReasonRevoked nvarchar(255) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.RefreshTokens ADD CONSTRAINT
	PK_RefreshTokens PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.RefreshTokens SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.RefreshTokens', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.RefreshTokens', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.RefreshTokens', 'Object', 'CONTROL') as Contr_Per 