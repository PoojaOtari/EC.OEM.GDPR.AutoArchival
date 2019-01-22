/***
Testing  the GDPR Framework from UI 
**/

-- 1. Create backup tables from existing for demo purpose

SELECT *  INTO OEMReporting.dbo.SALE01SalesDocumentTypeBckp0711 FROM OEMReporting.dbo.SALE01SalesDocumentType
SELECT *  INTO OEMReporting.dbo.SCST01CustomerGroupBckp0711		FROM OEMReporting.dbo.SCST01CustomerGroup
SELECT *  INTO OEMReporting.dbo.SDMN01SalesOfficeBckp0711		FROM OEMReporting.dbo.SDMN01SalesOffice
SELECT *  INTO OEMReporting.dbo.ContractLineItemsBckp0711		FROM OEMReporting.dbo.ContractLineItems
SELECT *  INTO OEMReporting.dbo.SoldToOEMBckp0711				FROM OEMReporting.dbo.SoldToOEM

-- 2. Select the initial count before purging
SELECT COUNT(1) FROM OEMReporting.dbo.SALE01SalesDocumentTypeBckp0711 
SELECT COUNT(1) FROM OEMReporting.dbo.SCST01CustomerGroupBckp0711		
SELECT COUNT(1) FROM OEMReporting.dbo.SDMN01SalesOfficeBckp0711		
SELECT COUNT(1) FROM OEMReporting.dbo.ContractLineItemsBckp0711		
SELECT COUNT(1) FROM OEMReporting.dbo.SoldToOEMBckp0711		

-- 3. Select the job list we have already
select * from msdb.dbo.sysjobs  where name like 'DMN%'

-- 4. we will create the jobs using UI

-- 5. After query creation in UI and deploy all following details should be available
--- 5.1 Check new job created ?

select * from msdb.dbo.sysjobs  where name like 'DMN%'

-- 5.2 Check the tables are created with 0 records in the OEMReporting_Purge db which we selected in the UI

select * from OEMReporting_Purge.INFORMATION_SCHEMA.TABLES WHERE Table_Name IN(
'SALE01SalesDocumentTypeBckp0711'
,'SCST01CustomerGroupBckp0711'
,'SDMN01SalesOfficeBckp0711'
,'ContractLineItemsBckp0711'
,'SoldToOEMBckp0711')

-- 5.3 Check new rows inserted in the SAPPurgeTableList
select * from OEMReporting_Purge.dbo.SAPPurgeTableList


-- 6--  Now Execute any new job and see it in the Job Activity Monitor if its running and succeded

-- 7 -- If Its succeded check the status of those tables in SAPPugeTableList, status should be 2 

select * from OEMReporting_Purge.dbo.SAPPurgeTableList

-- 9 -- Check the new count of records in purge db  after purging OEMReporting_purge should have more than 0 and OEMreporting should have 0 records
SELECT COUNT(1) FROM OEMReporting_purge.dbo.SALE01SalesDocumentTypeBckp0711 
SELECT COUNT(1) FROM OEMReporting_purge.dbo.SCST01CustomerGroupBckp0711		
SELECT COUNT(1) FROM OEMReporting_purge.dbo.SDMN01SalesOfficeBckp0711		
SELECT COUNT(1) FROM OEMReporting_purge.dbo.ContractLineItemsBckp0711		
SELECT COUNT(1) FROM OEMReporting_purge.dbo.SoldToOEMBckp0711		

SELECT COUNT(1) FROM OEMReporting.dbo.SALE01SalesDocumentTypeBckp0711 
SELECT COUNT(1) FROM OEMReporting.dbo.SCST01CustomerGroupBckp0711		
SELECT COUNT(1) FROM OEMReporting.dbo.SDMN01SalesOfficeBckp0711		
SELECT COUNT(1) FROM OEMReporting.dbo.ContractLineItemsBckp0711		
SELECT COUNT(1) FROM OEMReporting.dbo.SoldToOEMBckp0711		




--exec msdb.dbo.sp_delete_job 'jobname'