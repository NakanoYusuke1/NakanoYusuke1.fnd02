'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//button要素を取得
const saveClockInBtn = document.querySelector(".clockInBtn");
const saveClockOutBtn = document.querySelector(".clockOutBtn");
const fixClockInTime = document.querySelector(".fixClockInBtn");
const fixClockOutTime = document.querySelector(".fixClockOutBtn");


//div要素を取得
const saveClockInTime = document.querySelector(".clockInTime");
const saveClockOutTime = document.querySelector(".clockOutTime");
const displayWorkingHour = document.querySelector(".workingHour");
const sumPointOfSleep = document.getElementById("sumPointOfSleep");
const sumPointOfFood = document.getElementById("sumPointOfFood");
const allPoints = document.getElementById("allPoints");

//meter要素を取得
const meterElement = document.querySelector(".meter");



//クリックした時に時間をしまっておく場所
let now1 = "";
let now2 = "";
let now3 = ""; //修正後の時間格納用（ミリ秒）
let now4 = ""; //修正後の時間格納用（ミリ秒）

//クリック時の「出勤」日時情報を取得
saveClockInBtn.addEventListener('click', () => {
    now1 = new Date();
    const nowYear1 = now1.getFullYear(); 
    const nowMon1 = now1.getMonth() + 1;
    const nowDate1 = now1.getDate();
    const nowHour1 = now1.getHours();
    const nowMinute1 = now1.getMinutes();

    //div要素に時刻表示
    saveClockInTime.innerText = `出勤時間： ${nowYear1}/${nowMon1}/${nowDate1} ${nowHour1}:${nowMinute1}`;
});

//クリック時の「退勤」日時情報を取得
saveClockOutBtn.addEventListener('click', () => {
    now2 = new Date();
    const nowYear2 = now2.getFullYear(); 
    const nowMon2 = now2.getMonth() + 1;
    const nowDate2 = now2.getDate();
    const nowHour2 = now2.getHours();
    const nowMinute2 = now2.getMinutes();

    //div要素に時刻表示
    saveClockOutTime.innerText = `退勤時間： ${nowYear2}/${nowMon2}/${nowDate2} ${nowHour2}:${nowMinute2}`;
    
    //workingTimeの表示
    const workingTime = now2 - now1;
    displayWorkingHour.innerText =
     `今日の勤務時間は${Math.floor(workingTime/1000/60/60)%24}時間${Math.floor(workingTime/1000/60)%60}分です！`
    //  ${Math.floor(workingTime/1000)%60}秒
});


// 修正後の出勤時刻の取得
const FixedClockInTime = document.getElementById("InputFixedClockInTime");

FixedClockInTime.addEventListener("change", (e) => {
    const value = e.target.value;
    // now3 = Date.parse(value);
    now3 = new Date(value);
    const nowYear3 = now3.getFullYear(); 
    const nowMon3 = now3.getMonth() + 1;
    const nowDate3 = now3.getDate();
    const nowHour3 = now3.getHours();
    const nowMinute3 = now3.getMinutes();
    //div要素に時刻表示
    saveClockInTime.innerText = `出勤時間： ${nowYear3}/${nowMon3}/${nowDate3} ${nowHour3}:${nowMinute3}`;
    
    //workingTimeの更新
    if(now4 === "") {
      const workingTime = now2 - now3;
      displayWorkingHour.innerText =
      `今日の勤務時間は${Math.floor(workingTime/1000/60/60)%24}時間${Math.floor(workingTime/1000/60)%60}分です！`
    } else {
      const workingTime = now4 - now3;
      displayWorkingHour.innerText =
      `今日の勤務時間は${Math.floor(workingTime/1000/60/60)%24}時間${Math.floor(workingTime/1000/60)%60}分です！`
    }
});



// 修正後の退勤時刻の取得
const FixedClockOutTime = document.getElementById("InputFixedClockOutTime");

FixedClockOutTime.addEventListener("change", (e) => {
    const value = e.target.value;
    now4 = new Date(value);
    const nowYear4 = now4.getFullYear(); 
    const nowMon4 = now4.getMonth() + 1;
    const nowDate4 = now4.getDate();
    const nowHour4 = now4.getHours();
    const nowMinute4 = now4.getMinutes();
    //div要素に時刻表示
    saveClockOutTime.innerText = `出勤時間： ${nowYear4}/${nowMon4}/${nowDate4} ${nowHour4}:${nowMinute4}`;
    
    //workingTimeの更新
    if (now3 === "") {
      const workingTime = now4 - now1;
      displayWorkingHour.innerText =
      `今日の勤務時間は${Math.floor(workingTime/1000/60/60)%24}時間${Math.floor(workingTime/1000/60)%60}分です！`;
    } else {
      const workingTime = now4 - now3;
      displayWorkingHour.innerText =
      `今日の勤務時間は${Math.floor(workingTime/1000/60/60)%24}時間${Math.floor(workingTime/1000/60)%60}分です！`;
    }
});



// 睡眠時間記録表

//目標値
const sleepTimeGoal = 7.0;
const goalOfSleepTime = document.getElementById("goalOfSleepTime");
goalOfSleepTime.innerText = `目標睡眠時間：${sleepTimeGoal}時間`;

// 過去記録
const arrayOfSleepTime = [
  {date : "2025-12-17", time : 6.5},
  {date : "2025-12-18", time : 7.5},
  {date : "2025-12-19", time : 8.0},
  {date : "2025-12-20", time : 8.0},
  {date : "2025-12-21", time : 9.0},
]

for (let i = 0; i < arrayOfSleepTime.length; i++) {
  if (arrayOfSleepTime[i]["time"] >= sleepTimeGoal) {
    arrayOfSleepTime[i]["point"] = 1; 
  } else {
    arrayOfSleepTime[i]["point"] = -1;
  }
}

// 過去記録から表に記入
const sleepTimeList = document.getElementById("recordTableBody");

arrayOfSleepTime.forEach((obj) => {
  const tr = document.createElement("tr");
  sleepTimeList.appendChild(tr);

  for (const innerObj2 in obj) {
    const td = document.createElement("td");
    td.textContent = obj[innerObj2];
    tr.appendChild(td);
  }
});

// 睡眠時間の合計ポイントを表示
sumPointS();


// 表に追加する関数作成
function addRecord() {
  const inputSleepDate = document.getElementById('sleepDate');
  const inputSleepTime = document.getElementById('sleepTime');
  const tableBody = document.getElementById('recordTableBody');

  const sleepDate = inputSleepDate.value;
  const sleepTime = inputSleepTime.value;
  let sleepPoint = 0;
  
  if (sleepTime >= sleepTimeGoal) {
    sleepPoint = 1;
  } else {
    sleepPoint = -1;
  }

  // 新しい行を作成し、データを追加
  const newRow = tableBody.insertRow();
  const cellDate = newRow.insertCell(0);
  const cellTime = newRow.insertCell(1);
  const cellPoint = newRow.insertCell(2);


  cellDate.textContent = sleepDate;
  cellTime.textContent = sleepTime;
  cellPoint.textContent = sleepPoint;

  // 睡眠時間の合計ポイントを表示
  sumPointS();
  sumAllPoints();
}

//表から点数を総合得点を取得
function sumPointS() {
  const tableElement = document.getElementById('tableOfSleepTime');
  const rowElement = tableElement.rows;
  let point = 0;
  for (let i = 1; i < rowElement.length; i++) {
      point += parseInt(rowElement[i].cells[2].innerText);
  }
  sumPointOfSleep.innerText = `現在のポイント：${point} pt`;
  return point;
}



//////////////////////////////////食事の表////////////////////////////////////////

//カロリーの目標値
const calorieGoal = 800;
const goalOfCalorie = document.getElementById("goalOfCalorie");
goalOfCalorie.innerText = `目標カロリー：${calorieGoal}kcal以下`;

// 過去記録
const arrayOfFood = [
  {date : "2025-12-17", calorie : 650},
  {date : "2025-12-18", calorie : 700},
  {date : "2025-12-19", calorie : 1000},
  {date : "2025-12-20", calorie : 500},
  {date : "2025-12-21", calorie : 500},
]

for (let i = 0; i < arrayOfFood.length; i++) {
  if (arrayOfFood[i]["calorie"] <= calorieGoal) {
    arrayOfFood[i]["point"] = 1; 
  } else {
    arrayOfFood[i]["point"] = -1;
  }
}

// 過去記録から表に記入
const foodList = document.getElementById("recordTableBody2");

arrayOfFood.forEach((obj) => {
  const tr = document.createElement("tr");
  foodList.appendChild(tr);

  for (const innerObj2 in obj) {
    const td = document.createElement("td");
    td.textContent = obj[innerObj2];
    tr.appendChild(td);
  }
});

// 食事の合計ポイントを表示
sumPointS2();

// 表に追加する関数作成(食事ver)
function addRecord2() {
  const inputEatDate = document.getElementById('eatDate');
  const inputfoodCalrie = document.getElementById('foodCalorie');
  const tableBody = document.getElementById('recordTableBody2');

  const eatDate = inputEatDate.value;
  const foodCalorie = inputfoodCalrie.value;
  let foodPoint = 0;
  
  if (foodCalorie >= calorieGoal) {
    foodPoint = 1;
  } else {
    foodPoint = -1;
  }

  // 新しい行を作成し、データを追加
  const newRow = tableBody.insertRow();
  const cellDate=  newRow.insertCell(0);
  const cellCalorie = newRow.insertCell(1);
  const cellPoint = newRow.insertCell(2);


  cellDate.textContent = eatDate;
  cellCalorie.textContent = foodCalorie;
  cellPoint.textContent = foodPoint;

  // 睡眠時間の合計ポイントを表示
  sumPointS2();
   sumAllPoints();
}

//表から点数を総合得点を取得(食事ver)
function sumPointS2() {
  const tableElement = document.getElementById('tableOfFood');
  const rowElement = tableElement.rows;
  let point = 0;
  for (let i = 1; i < rowElement.length; i++) {
      point += parseInt(rowElement[i].cells[2].innerText);
  }
  sumPointOfFood.innerText = `現在のポイント：${point} pt`;
  return point;
}



//////////////////////////////////歩数の表////////////////////////////////////////

//歩数の目標値
const fitnessGoal = 8000;
const goalOfFitness = document.getElementById("goalOfFitness");
goalOfFitness.innerText = `目標カロリー：${fitnessGoal}歩`;

// 過去記録
const arrayOfFitness = [
  {date : "2025-12-17", steps : 10000},
  {date : "2025-12-18", steps : 12500},
  {date : "2025-12-19", steps : 300},
  {date : "2025-12-18", steps : 7000},
  {date : "2025-12-19", steps : 6000}, 
]

for (let i = 0; i < arrayOfFitness.length; i++) {
  if (arrayOfFitness[i]["steps"] >= fitnessGoal) {
    arrayOfFitness[i]["point"] = 1; 
  } else {
    arrayOfFitness[i]["point"] = -1;
  }
}

// 過去記録から表に記入
const fitnessList = document.getElementById("recordTableBody3");

arrayOfFitness.forEach((obj) => {
  const tr = document.createElement("tr");
  fitnessList.appendChild(tr);

  for (const innerObj2 in obj) {
    const td = document.createElement("td");
    td.textContent = obj[innerObj2];
    tr.appendChild(td);
  }
});

// 運動の合計ポイントを表示
sumPointS3();

// 表に追加する関数作成 (運動ver)
function addRecord3() {
  const inputFitnessDate = document.getElementById('fitnessDate');
  const inputSteps = document.getElementById('fitnessSteps');
  const tableBody = document.getElementById('recordTableBody3');

  const FitnessDate = inputFitnessDate.value;
  const steps = inputSteps.value;
  let fitnessPoint = 0;
  
  if (steps >= fitnessGoal) {
    fitnessPoint = 1;
  } else {
    fitnessPoint = -1;
  }

  // 新しい行を作成し、データを追加
  const newRow = tableBody.insertRow();
  const cellDate=  newRow.insertCell(0);
  const cellSteps = newRow.insertCell(1);
  const cellPoint = newRow.insertCell(2);


  cellDate.textContent = FitnessDate;
  cellSteps.textContent = steps;
  cellPoint.textContent = fitnessPoint;

  // 睡眠時間の合計ポイントを表示
  sumPointS3();
  sumAllPoints();
}

//表から点数を総合得点を取得(運動ver)
function sumPointS3() {
  const tableElement = document.getElementById('tableOfFitness');
  const rowElement = tableElement.rows;
  let point = 0;
  for (let i = 1; i < rowElement.length; i++) {
      point += parseInt(rowElement[i].cells[2].innerText);
  }
  sumPointOfFitness.innerText = `現在のポイント：${point} pt`;
  return point;
}

//Allポイント（上に表示するやつ）
 sumAllPoints();

function sumAllPoints () {
  let sumPoints = sumPointS() + sumPointS2() + sumPointS3();
  allPoints.innerText = `余力残高：${sumPoints}`;
  console.log(meterElement);
  meterElement.value = sumPoints;
}
