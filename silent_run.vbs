Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\LiuYu\Desktop\web"
WshShell.Run "C:\Users\LiuYu\AppData\Local\Programs\Python\Python313\python.exe -m http.server 8000", 0, False
