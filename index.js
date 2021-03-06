
var AllData=[];
const taskContainer=document.querySelector(".task_container");
console.log(taskContainer);


function generateCard(taskData)
{
  const newCard=`
    <div class="col-md-6 col-lg-4" id=${taskData.id}>
              <div class="card">
                <div class="card-header d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this,arguments)" >
                    <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this,arguments)" ></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
                    <i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i>
                  </button>
                </div>
                <img src="${taskData.imageurl}" class="card-img-top" alt="...">

                <div class="card-body">
                  <h5 class="card-title">${taskData.tasktitle}</h5>
                  <p class="card-text">${taskData.taskdescription}</p>
                  <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
                </div>
                <div class="card-footer ">
                  <button type="button" class="btn btn-primary float-end" id=${taskData.id}>Open Task</button>
                </div>
              </div>
            </div>`

          return newCard;

}

function loadInitialCardData()
{
    const getCardData=localStorage.getItem("Tasky");

    const {cards}=JSON.parse(getCardData);

    cards.map((cardObject)=>{

      taskContainer.insertAdjacentHTML("beforeend",generateCard(cardObject));
      AllData.push(cardObject);

    })
}

function addData()
{
    const taskData={
        id:`${Date.now()}`,
        imageurl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };

    

        taskContainer.insertAdjacentHTML("beforeend",generateCard(taskData));
        AllData.push(taskData);
        localStorage.setItem("Tasky",JSON.stringify({cards:AllData}));
    
}

function deleteCard(event)
{
  event=window.event;
  const toDeleteId=event.target.id;
  const tag=event.target.tagName;
  AllData = AllData.filter((cardObject)=> cardObject.id !== toDeleteId);
  localStorage.setItem("Tasky",JSON.stringify({cards:AllData}));

  //contact the parent to delete the child

  if(tag === "BUTTON")
  {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else
  {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
}

//Page Refresh will erase the added data so use local storage to save the data
//Use local storage  API that has 5MB of space

const editCard=(event)=>{

      event=window.event;
      const toEditId=event.target.id;
      const tag=event.target.tagName;


      let parentElement;
      if(tag === "BUTTON")
      {
          parentElement=event.target.parentNode.parentNode;

      }
      else
      {
          parentElement=event.target.parentNode.parentNode.parentNode;

      }

      let tasktitle=parentElement.childNodes[5].childNodes[1];
      let tasktype=parentElement.childNodes[5].childNodes[5];
      let taskdescription=parentElement.childNodes[5].childNodes[3];
      let submitbtn=parentElement.childNodes[7].childNodes[1];

      tasktitle.setAttribute("contenteditable","true");
      tasktype.setAttribute("contenteditable","true");
      taskdescription.setAttribute("contenteditable","true")
      submitbtn.innerHTML="Save Changes"
      submitbtn.setAttribute(
        "onclick",
        "saveChanges.apply(this,arguments)"
      )
      
}
const saveChanges=(event)=>{

      event=window.event;
      const toEditId=event.target.id;
      const tag=event.target.tagName;


      let parentElement;
      if(tag === "BUTTON")
      {
          parentElement=event.target.parentNode.parentNode;

      }
      else
      {
          parentElement=event.target.parentNode.parentNode.parentNode;

      }

      let tasktitle=parentElement.childNodes[5].childNodes[1];
      let tasktype=parentElement.childNodes[5].childNodes[5];
      let taskdescription=parentElement.childNodes[5].childNodes[3];
      let submitbtn=parentElement.childNodes[7].childNodes[1];

      const newUpCard={

        
        tasktitle: tasktitle.innerHTML,
        tasktype: tasktype.innerHTML ,
        taskdescription: taskdescription.innerHTML,


      }

      AllData=AllData.map((task)=>{
        if(task.id === toEditId)
        {
          return {
            id:task.id,
            imageurl:task.imageurl,
            tasktitle:newUpCard.tasktitle,
            tasktype:newUpCard.tasktitle,
            taskdescription:newUpCard.tasktype,

          };

        }
        return task;
      });

      localStorage.setItem("Tasky",JSON.stringify({cards:AllData}));



}