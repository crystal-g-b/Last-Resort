var tableEl = document.querySelector('.table')



function init (){
    callingStorage()
}

// calling for the function for the local storage
function callingStorage(){
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
}

init()