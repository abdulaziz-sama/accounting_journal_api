import sys
import json 
import xlsxwriter

data = json.loads(sys.argv[1])

workbook = xlsxwriter.Workbook('trial-balance.xlsx')
worksheet = workbook.add_worksheet()
worksheet.set_column(0, 0, 30)
worksheet.set_column(1, 1, 20)
worksheet.set_column(2, 2, 15)
worksheet.write(0, 0, 'Account')
worksheet.write(0, 1, 'Debit Value')
worksheet.write(0, 2, 'Credit Value')

for index, account in enumerate(data):
    worksheet.write(index+1, 0, account["name"])
    worksheet.write(index+1, 1, account["debitValue"])
    worksheet.write(index+1, 2, account["creditValue"])


workbook.close()


