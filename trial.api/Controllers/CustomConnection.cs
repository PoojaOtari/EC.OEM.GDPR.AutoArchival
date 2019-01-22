using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Diagnostics;
using trial.api.Data;

namespace trial.api.Controllers
{
    
    class CustomConnection
    {
       
        public int serverid { get; set; }
        public string servername { get; set; }
        public int dbid { get; set; }
        public string dbname { get; set; }


        public CustomConnection()
        {
            

        }

        public CustomConnection(int serverid, string servername)
        {
            this.serverid = serverid;
            this.servername = servername;

        }

        public static IEnumerable<DbInfo> ExecuteReader(string servername, string dbname, string tablename, int serverid)
        {
            try
            {
                return executeReader(servername,dbname,tablename, serverid);
            }
            catch (Exception ex)
            {
                return null;
                // your handling code here
            }
        }

        public  IEnumerable<DbInfo> ConnectDB()
        {
            
            string connstring = "Server = " + this.servername + "; Database = master; Trusted_Connection = True; MultipleActiveResultSets = true";
            
            string query = "select database_id,name from sys.databases";


            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new DbInfo { database_id = Convert.ToInt32(reader["database_id"]), name = reader["name"].ToString(),Server_Id = serverid };
                        }
                    }
                }
            }
        }

        public string GeDBName(int dbid)
        {

            string connstring = "Server = " + this.servername + "; Database = master; Trusted_Connection = True; MultipleActiveResultSets = true";

            string query = "select database_id,name from sys.databases where database_id = " + dbid;


            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return reader["name"].ToString();
                        }
                    }
                }
            }
            return null; //handle exeptions
        }


        public IEnumerable<tableInfo> ConnectTables(int dbid)
        {
            string dbname = GeDBName(dbid);

            string connstring = "Server = " + this.servername + "; Database = "+ dbname + "; Trusted_Connection = True; MultipleActiveResultSets = true";



            string query = "select object_id,name from sys.tables";
            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new tableInfo { object_id = Convert.ToInt32(reader["object_id"]), name = reader["name"].ToString(), DBname= dbname };
                        }
                    }
                }
            }
        }

        public IEnumerable<JobInfo> ConnectJobs()
        {

            string connstring = "Server = " + this.servername + "; Database = msdb; Trusted_Connection = True; MultipleActiveResultSets = true";

            string query = "  SELECT DISTINCT @@SERVERNAME			AS [Server Name],"
                            + " ja.job_id				AS [Job Id],  "
                            + "j.name AS [Job Name],   "
                            + "CASE WHEN jh.run_status =  0  THEN 'Failed'  "
                            + "	 WHEN jh.run_status =  1 THEN 'Succeeded'  "
                            + "	 WHEN jh.run_status =  2  THEN 'Retry'  "
                            + "	 WHEN jh.run_status =  3 THEN 'Canceled'  "
                            + "	 WHEN jh.run_status =  4  THEN 'In Progress'   "
                            + "	 END					AS [Run Status], "
                            + "ja.next_scheduled_run_date  AS [Next Scheduled Run],  "
                            + "jh.message					AS [Message],  "
                            + "jh.operator_id_emailed		AS [Emailed To], "
                            + "jh.run_date					AS [Run Date], "
                            + "jh.run_time					AS [Run Time],  "
                            + "jh.run_duration				AS [Time Taken], "
                            + "ja.start_execution_date		AS [Started Date],  "
                            + "ja.stop_execution_date		AS [Stop Execution Date]"
                            + "FROM  (msdb.dbo.sysjobactivity ja  "
                            + "LEFT JOIN msdb.dbo.sysjobhistory "
                            + "jh ON ja.job_history_id = jh.instance_id)"     
                            + "join msdb.dbo.sysjobs_view j "
                            + "on ja.job_id = j.job_id "
                            + "where j.name like 'DMN_OEMPurgeJob_Group%'; ";


            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new JobInfo {
                                JobId = reader["Job Id"].ToString(),
                                ServerId= this.serverid,
                                ServerName =(reader["Server Name"]).ToString(),
                                JobName = reader["Job Name"].ToString(),
                                RunStatus = (Convert.IsDBNull(reader["Run Status"]) ? null :(reader["Run Status"]).ToString()),
                                //RunStatus = (reader["Run Status"]).ToString(),
                                Message = (Convert.IsDBNull(reader["Message"]) ? null : (reader["Message"]).ToString()),
                                //Message = (reader["Message"]).ToString(),
                                EmailedTo = (Convert.IsDBNull(reader["Emailed To"]) ? null :(int?) Convert.ToInt32(reader["Emailed To"])),
                                //EmailedTo = Convert.ToInt32(reader["Emailed To"]),
                                RunDate = (Convert.IsDBNull(reader["Run Date"]) ? null : (int?)Convert.ToInt32(reader["Run Date"])),
                                //RunDate = Convert.ToInt32(reader["Run Date"]),
                                RunTime = (Convert.IsDBNull(reader["Run Time"]) ? null : (int?)Convert.ToInt32(reader["Run Time"])),
                                //RunTime = Convert.ToInt32(reader["Run Time"]),
                                TimeTaken = (Convert.IsDBNull(reader["Time Taken"]) ? null : (int?)Convert.ToInt32(reader["Time Taken"])),
                                //TimeTaken = Convert.ToInt32(reader["Time Taken"]),
                                NextScheduledRun = (Convert.IsDBNull(reader["Next Scheduled Run"]) ? null : (DateTime?)Convert.ToDateTime(reader["Next Scheduled Run"])),
                                //NextScheduledRun = Convert.ToDateTime(reader["Next Scheduled Run"]),
                                StartedDate = (Convert.IsDBNull(reader["Started Date"]) ? null : (DateTime?)Convert.ToDateTime(reader["Started Date"])),
                                //StartedDate = Convert.ToDateTime(reader["Started Date"]),
                                StopExecutionDate = (Convert.IsDBNull(reader["Stop Execution Date"]) ? null : (DateTime?)Convert.ToDateTime(reader["Stop Execution Date"]))
                                //StopExecutionDate = Convert.ToDateTime(reader["Stop Execution Date"])
                            };
                        }
                    }
                }
            }
        }



        public IEnumerable<JobInfo> ExecuteJob(string JobName)
        {

            string connstring = "Server = " + this.servername + "; Database = msdb; Trusted_Connection = True; MultipleActiveResultSets = true";

            string query = " EXEC msdb.dbo.sp_start_job @job_name= '" + JobName + "'";


            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                    }
                }
            }
            return null;
        }

        public IEnumerable<JobInfo> DeployAll()
        {

            string connstring = "Server = I25OC2DSQLRPT01.partners.extranet.microsoft.com; Database = OEMReporting_Purge; Trusted_Connection = True; MultipleActiveResultSets = true";

            string query = "EXEC Deploymetadata";


            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                    }
                }
            }
            return null;
        }

        //public IEnumerable<JobInfo> RefreshJob(string JobName)
        //{

        //    string connstring = "Server = " + this.servername + "; Database = msdb; Trusted_Connection = True; MultipleActiveResultSets = true";

        //    string query = " EXEC msdb.dbo.sp_start_job @job_name= " + JobName;


        //    using (SqlConnection cn = new SqlConnection(connstring))
        //    {
        //        cn.Open();
        //        using (SqlCommand cmd = new SqlCommand(query, cn))
        //        {
        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //            }
        //        }
        //    }
        //}








        private static IEnumerable<DbInfo> executeReader(string servername, string dbname, string tablename, int serverid)
        {
            // same code as you have above in your example

            string connstring = "Server = " + servername + "; Database = " + dbname + "; Trusted_Connection = True; MultipleActiveResultSets = true";

           string query = "select * from " + tablename;

            using (SqlConnection cn = new SqlConnection(connstring))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand(query, cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new DbInfo { database_id = Convert.ToInt32(reader["database_id"]), name = reader["name"].ToString(), Server_Id = serverid };
                        }
                    }
                }
            }
        }

        public static void CreateConnection(string servername, string dbname, string tablename)
        {

            string connstring = "Server = " + servername + "; Database = " + dbname + "; Trusted_Connection = True; MultipleActiveResultSets = true";



            string query = "select * from " + tablename;

            using (SqlConnection conn = new SqlConnection(connstring))
            {
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                Debug.WriteLine(reader[0].ToString());
                            }

                        }

                         reader.Close();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                    finally
                    {
                        conn.Close();
                    }
                    Console.ReadLine();

                }
            }
        }
    }

}

