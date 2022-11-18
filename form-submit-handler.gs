//checks for duplicates and add the question code and user details to the data sheet

//triggered on every form submission
function handleSubmit(e){
  let respondent=e.response.getRespondentEmail()
  let questionResponse=e.response.getItemResponses()[0].getResponse()
  let q2Response=e.response.getItemResponses()[1].getResponse()
  let questionSlug=questionResponse;
  if(questionResponse.includes("https://leetcode.com/problems/")){
    urlSplit=questionResponse.split("/")
    if(urlSplit.length<5){
      return
    }
    questionSlug=urlSplit[4]
  }
  console.log(questionSlug)
  let doc=SpreadsheetApp.openById("1OtGWKGwIMGdHOgZ23V4APQA_8hsaa6xndcuT0ZWeOyQ")
  let sheet=doc.getSheetByName("data")
  let rows=sheet.getDataRange().getNumRows()
  let range=sheet.getRange(`A1:D${rows}`)
  let data=range.getValues()
  let pos=data.findIndex(row=>{
    return row[0]==questionSlug
  })
  console.log(pos)
  let newData=[];
  if(pos>=0){
    let completedUsers=data[pos][1].split(" ")
    let userExist=completedUsers.findIndex(user=>{
      return user==respondent
    })
    console.log({userExist})
    if(userExist==-1){
      completedUsers.push(respondent)
    }
    newData=[data[pos]]
    rows=pos+1;
    newData[0][1]=completedUsers.join(" ") 
    newData[0][3]=`=LEETDETAIL(A${rows})`
  }
  else{
    rows++;
    newData.push([questionSlug,respondent,q2Response,`=LEETDETAIL(A${rows})`])    
  }
  range=sheet.getRange(`A${rows}:D${rows}`)
  range.setValues(newData)
  
  console.log(data)
}