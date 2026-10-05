param(
  [string]$RepoUrl = ""
)

$gitExe = "C:\Users\rupai\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd\git.exe"
if (-not (Test-Path $gitExe)) {
  $gitExe = "git"
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  বাংলাদেশ ফুড পাসপোর্ট - Auto Deploy to GitHub" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# Check if remote origin already exists
$hasOrigin = & $gitExe remote get-url origin 2>$null
if (-not $hasOrigin) {
  if (-not $RepoUrl) {
    Write-Host "`nGitHub রিপোজিটরির লিঙ্ক দিন (যেমন: https://github.com/SMMahmudIqbal/bd-food-passport.git):" -ForegroundColor Yellow
    $RepoUrl = Read-Host "GitHub URL"
  }
  
  if ($RepoUrl) {
    & $gitExe remote add origin $RepoUrl
    Write-Host "✓ Remote origin সংযুক্ত হয়েছে: $RepoUrl" -ForegroundColor Green
  } else {
    Write-Host "কোনো রিপোজিটরি লিঙ্ক দেওয়া হয়নি।" -ForegroundColor Red
    exit 1
  }
}

Write-Host "`n১. কোড স্টেজ এবং কমিট করা হচ্ছে..." -ForegroundColor Cyan
& $gitExe add .
& $gitExe commit -m "feat: auto update and deploy" 2>$null

Write-Host "`n২. GitHub-এ পুশ করা হচ্ছে (main branch)..." -ForegroundColor Cyan
& $gitExe push -u origin main

Write-Host "`n✓ সফলভাবে GitHub-এ পুশ সম্পন্ন হয়েছে!" -ForegroundColor Green
Write-Host "GitHub Actions স্বয়ংক্রিয়ভাবে প্রোডাকশন বিল্ড তৈরি করে GitHub Pages-এ লাইভ ডিপ্লয় করবে।" -ForegroundColor White
Write-Host "আপনার রিপোজিটরির 'Actions' ট্যাবে লাইভ প্রগ্রেস দেখতে পাবেন।" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan
