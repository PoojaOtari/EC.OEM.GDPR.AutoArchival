using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using trial.api.Data;

namespace trial.api.Data
{
    public class db_context : DbContext
    {
        public db_context(DbContextOptions<db_context> options) : base(options)
        {

        }

        public DbSet<db> databases{ get; set; }
        public DbSet<server> servers { get; set; }
        public DbSet<table> tables { get; set; }
        public DbSet<SAPPurgeTable> SAPPurgeTables { get; set; }
        public DbSet<Archivalreq> Archivalreqs { get; set; }
        public DbSet<trial.api.Data.stgSAPPurgeTableList> stgSAPPurgeTableList { get; set; }
        public DbSet<trial.api.Data.JobInfo> JobInfo { get; set; }
        public DbSet<trial.api.Data.SQLquery> SQLquery { get; set; }
        //public object Database_Info { get; internal set; }
    }
}