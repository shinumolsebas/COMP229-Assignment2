//IIFE -- Immediately invoked function expression

(function(){

    function start()
    {
    console.log("App Started..");

    let deleteButtons = document.querySelectorAll('.btn-danger')

    for(button of deleteButtons)
    {
        button.addEventListener('click',(event)=>{
            if(!confirm("Are you sure to delete?"))
            {
                event.preventDefault();
                window.location.assign('/business-list');
            }
        });
    }

    }
    window.addEventListener("load", start);

})();