const taskContainer=document.querySelector(".task_container");
console.log(taskContainer);

function addData()
{
    const taskData={
        id:`${Date.now()}`,
        imageurl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };

    const newCard=`
    <div class="col-md-6 col-lg-4" id=${taskData.id}>
              <div class="card">
                <div class="card-header d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                  <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                </div>
                <img src="${taskData.imageurl}" class="card-img-top" alt="...">

                <div class="card-body">
                  <h5 class="card-title">${taskData.tasktitle}</h5>
                  <p class="card-text">${taskData.taskdescription}</p>
                  <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
                </div>
                <div class="card-footer ">
                  <button type="button" class="btn btn-primary float-end">Open Task</button>
                </div>
              </div>
            </div>`

        taskContainer.insertAdjacentHTML("beforeend",newCard);
    
}