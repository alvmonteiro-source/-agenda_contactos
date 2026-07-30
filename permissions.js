function isLoggedIn() {
    var user = sessionStorage.getItem('currentUser');
    return !!user;
}

function getCurrentUser() {
    var user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function getPagePermissions(section) {
    var user = getCurrentUser();
    if (!user) return [];
    if (user.role === 'admin') {
        return ['ver', 'criar', 'editar', 'apagar', 'ativar_desativar', 'ver_senhas', 'criar_entidade', 'importar', 'exportar', 'backup', 'gerir_contactos', 'enviar_email', 'gerir_funcoes', 'atribuir_todas', 'exportar', 'limpar', 'ver_detalhes', 'ver_estatisticas', 'partilhar'];
    }
    if (!user.pagePermissions) return [];
    return user.pagePermissions[section] || [];
}

function safeNavigate(event, page, section) {
    event.preventDefault();
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    var perms = getPagePermissions(section);
    if (!perms.includes('ver')) {
        alert('Não tem permissão para aceder a esta página.');
        return;
    }
    window.location.href = page;
}
