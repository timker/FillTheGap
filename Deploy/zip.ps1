$destfile =  Join-Path -Path (Resolve-Path ..\Deploy).Path  -ChildPath deploy.zip

Remove-Item deploy.zip


[Reflection.Assembly]::LoadWithPartialName( "System.IO.Compression.FileSystem" )
$src_folder =  Resolve-Path ..\Extension

$compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal
$includebasedir = $false
[System.IO.Compression.ZipFile]::CreateFromDirectory($src_folder,$destfile,$compressionLevel, $includebasedir)