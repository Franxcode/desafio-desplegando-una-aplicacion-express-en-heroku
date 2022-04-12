moment.locale(); 
const url = '/';

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');

const insertUser = (event) => {

    event.preventDefault();

    const payload = {
        username: username.value,
        email: email.value,
        password: password.value,
        fecha: formatDate()
    };
      
    axios.post(url + 'users', payload).then((response) => {
            const { response:data } = response.data;
            Swal.fire({
                title: 'Éxito!',
                text: `Has creado un nuevo usuario -
                username: ${data.username} |
                email: ${data.email} |
                fecha: ${formatDate(data.fecha)}`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok!'
            });
            username.value = "";
            email.value = "";
            password.value = "";  

    }).catch((error) => {
        const { data } = error.response;
        const errorMessages = {
            "users_username_key": "El nombre de usuario ya existe.",
            "users_email_key": "El email ya existe."
        };
        Swal.fire({
            title: 'Ha ocurrido un error!',
            text: `Error:
             ${errorMessages[data.response.constraint]}`,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok!'
          });
    });
};

const formatDate = (date) => {
    const dateFormat = moment(date).format("LL");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
  };
formatDate();