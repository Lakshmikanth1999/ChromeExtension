fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(quotesdata => {
        const QuotesData = quotesdata.quote;
        const quoteElement = document.getElementById('quoteElement');

        quoteElement.innerHTML = QuotesData;

    })
document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Kindly Enter Task Name!!!!")
    }

    else{
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">
                    <i class="gg-trash"></i>
                </button>
            </div>
        `;

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
}
