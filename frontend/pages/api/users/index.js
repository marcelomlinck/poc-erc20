import { apiHandler, usersRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getUsers
});

function getUsers(req, res) {
    // return users without hashed passwords in the response
    const response = usersRepo.getAll().map(x => omit(x, 'hash')).map(x => omit(x, 'privateKey'));
    console.log(response)
    return res.status(200).json(response);
}
