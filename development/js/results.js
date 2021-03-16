var tableEl = document.querySelector('.table')


// calling for the function for the local storage
function init (){
    callingStorage()
}

function callingStorage(){
    // I need a 
    
    // calling the storage pair, do we want to match it to the city or the music?
    var values = [],
        keys = Object.keys(localStorage),
        values = Object.values(localStorage)
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
        var node = document.createElement('tr')
        var subNode = document.createElement('td')
        var subNode2 = document.createElement('td')

        tableEl.appendChild(node)
        node.appendChild(subNode)
        subNode.textContent = keys[i]
        node.appendChild(subNode2)
        subNode2.textContent = values[i]
        
    }

    // return values;
}


init()