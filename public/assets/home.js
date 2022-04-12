moment.locale(); 
const url = '/';

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let tbody = document.getElementById('todosInfo');

const getUsers = async () => {
    await axios.get(url + 'users').then((data) => {
        const { users } = data.data;
        tbody.innerHTML = "";
        users.forEach((user, index) => {
            tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${formatDate(user.fecha)}</td>
          <td><button class="btn btn-danger" onclick="eliminarUser(${index + 1},'${user.id}')">Eliminar</button></td>
        </tr>
            `;
        });
    });
};

window.onload = getUsers();

const eliminarUser = (index, id) => {
    Swal.fire({
        title: 'Estás seguro que deseas eliminar este usuario?',
        text: "Está acción no podrá ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
        axios.delete(url + 'users' + '/' + id).then(() => {
                getUsers();
        });
          Swal.fire(
            'Borrado!',
            'El usuario ha sido eliminado.',
            'success'
          )
        }
    });
};

const formatDate = (date) => {
    const dateFormat = moment(date).format("LL");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
  };
formatDate();