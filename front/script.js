const form = document.querySelector('#reservaForm')
const nomeInput = document.querySelector('#nomeInput')
const numeroInput = document.querySelector('#numeroInput')
const checkInInput = document.querySelector('#checkInInput')
const checkOutInput = document.querySelector('#checkOutInput')
const URL = 'http://localhost:8000/filmes.php'

const tableBody = document.querySelector('#tabela-reservas')

function carregarReservas() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(reservas => {
            tableBody.innerHTML = ''

            for (let i = 0; i < reservas.length; i++) {
                const tr = document.createElement('tr')
                const reserva = reservas[i]
                tr.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${reserva.nome}</td>
                    <td>${reserva.numero}</td>
                    <td>${reserva.checkIn}</td>
                    <td>${reserva.checkOut}</td>
                    <td>
                        <button data-id="${reserva.id}" onclick="atualizarQuarto(${reserva.id})">Editar</button>
                        <button onclick="excluirReserva(${reserva.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

//função para criar um filme
function adicionarReserva(e) {

    e.preventDefault()

    const nome = nomeInput.value
    const numero = numeroInput.value
    const checkIn = checkInInput.value
    const checkOut = checkOutInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome=${encodeURIComponent(nome)}&numero=${encodeURIComponent(numero)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`
    })
        .then(response => {
            if (response.ok) {
                carregarReservas()
                nomeInput.value = ''
                numeroInput.value = ''
                checkInInput.value = ''
                checkOutInput.value = ''
            } else {
                console.error('Erro ao add reserva')
                alert('Erro ao add reserva ')
            }
        })
}

function atualizarReserva(id) {
    const novoNome = prompt("Digite o novo nome")
    const novoNumero = prompt("Digite o novo numero")
    const novoCheckIn = prompt("Digite a nova data do checkOut")
    const novoCheckOut = prompt("Digite a nova data docheckIn")
    if (novoNome && novoNumero && novoCheckIn && novoCheckOut) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nome=${encodeURIComponent(novoNome)}&numero=${encodeURIComponent(novoNumero)}&checkIn=${encodeURIComponent(novoCheckIn)}&checkOut=${encodeURIComponent(novoCheckOut)}`
        })
            .then(response => {
                if (response.ok) {
                    carregarReservas()
                } else {
                    console.error('Erro ao att quarto')
                    alert('erro ao att quarto')
                }
            })
    }
}
function excluirReservas(id){
    if(confirm('Deseja excluir a reserva?')){
        fetch(`${URL}?id=${id}`,{
            method: 'DELETE'
        })
        .then(response =>{
            if(response.ok){
                carregarReservas()
            }else{
                console.error('Erro ao excluir reserva')
                alert('Erro ao excluir reserva')
            }
        })
    }
}



form.addEventListener('submit', adicionarReserva)


