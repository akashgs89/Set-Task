const checkBoxList = document.querySelectorAll(".check-box")
const inputFields = document.querySelectorAll(".goal")
const errorLable = document.querySelector(".error-lable")
const progressBar = document.querySelector(".progress-bar")
const progressValue = document.querySelector(".progrees-value")



const allTask = JSON.parse(localStorage.getItem('allTask')) || {}
let completedTaskCount = Object.values(allTask).filter((Task) => Task.completed).length
progressValue.style.width = `${completedTaskCount / 3* 100}%`
progressValue.firstElementChild.innertText = `${completedTaskCount}/3 completed`



checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allTaskAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allTaskAdded) {
      checkbox.parentElement.classList.toggle('completed')
    
      const inputId = checkbox.nextElementSibling.id
      allTask[inputId].completed = !allTask[inputId].completed
      completedTaskCount = Object.values(allTask).filter((goal) => goal.completed).length
      progressValue.style.width = `${completedTaskCount / 3* 100}%`
      progressValue.firstElementChild.innertText = `${completedTaskCount}/3 completed`
      localStorage.setItem('allTask', JSON.stringify(allTask))

    } else {
      progressBar.classList.add("show-error")
    }
  })
})

inputFields.forEach((input) =>{
    input.value = allTask[input.id].name

    if(allTask[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        allTask[input.id] = {
            name : input.value,
            completed : false,
        }
        localStorage.setItem('allTask', JSON.stringify(allTask))
    })
}) 
