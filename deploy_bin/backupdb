#!/bin/sh
now="$(date +'%d_%m_%Y_%H_%M_%S')"
filename="db_backup_$now".gz
backupfolder="/home/deploy/BackupDB"
if [ ! -d $backupfolder ]; then
  mkdir $backupfolder
fi
fullpathbackupfile="$backupfolder/$filename"
logfile="$backupfolder/"backup_log_"$(date +'%Y_%m')".txt
echo "mysqldump started at $(date +'%d-%m-%Y %H:%M:%S')" >> "$logfile"
mysqldump -h$DATABASE_HOSTNAME -u$DATABASE_USERNAME -p$DATABASE_PASSWORD $DATABASE_NAME | gzip > "$fullpathbackupfile"
echo "mysqldump finished at $(date +'%d-%m-%Y %H:%M:%S')" >> "$logfile"
find "$backupfolder" -name db_backup_* -mtime +8 -exec rm {} \;
echo "old files deleted" >> "$logfile"
echo "operation finished at $(date +'%d-%m-%Y %H:%M:%S')" >> "$logfile"
echo "*****************" >> "$logfile"
exit 0
