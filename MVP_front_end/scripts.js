
const getList = async () => {
    let url = 'http://127.0.0.1:5000/produtos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.produtos.forEach(item => insertList(item.nome, item.ano, item.valor))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  getList()
  
  
  
  const postItem = async (inputProduct, inputAno, inputPrice) => {
    const formData = new FormData();
    formData.append('nome', inputProduct);
    formData.append('Ano', inputAno);
    formData.append('valor', inputPrice);
  
    let url = 'http://127.0.0.1:5000/produto';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
 
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/produto?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  const newItem = () => {
    let inputProduct = document.getElementById("newInput").value;
    let inputAno = document.getElementById("newAno").value;
    let inputPrice = document.getElementById("newPrice").value;
  
    if (inputProduct === '') {
      alert("Escreva o nome de um item!");
    } else if (isNaN(inputAno) || isNaN(inputPrice)) {
      alert("Quantidade e valor precisam ser números!");
    } else {
      insertList(inputProduct, inputAno, inputPrice)
      postItem(inputProduct, inputAno, inputPrice)
      alert("Item adicionado!")
    }
  }
  
  
  
  const insertList = (nameProduct, Ano, price) => {
    var item = [nameProduct, Ano, price]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newInput").value = "";
    document.getElementById("newAno").value = "";
    document.getElementById("newPrice").value = "";
  
    removeElement()
  }
