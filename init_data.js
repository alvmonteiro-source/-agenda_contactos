(function() {
    function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

    function loadDadosFromJSON(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'dados.json', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    try {
                        var dados = JSON.parse(xhr.responseText);

                        if (dados.utilizadores && dados.utilizadores.length > 0) {
                            var existing = JSON.parse(localStorage.getItem('users')) || [];
                            dados.utilizadores.forEach(function(u) {
                                var found = existing.some(function(e) { return e.username === u.username; });
                                if (!found) existing.push(u);
                            });
                            localStorage.setItem('users', JSON.stringify(existing));
                        }

                        if (dados.contactos && dados.contactos.length > 0) {
                            var existingC = JSON.parse(localStorage.getItem('listaContactos')) || [];
                            dados.contactos.forEach(function(c) {
                                if (!c.id) c.id = generateId();
                                var found = existingC.some(function(e) { return e.id === c.id; });
                                if (!found) existingC.push(c);
                            });
                            localStorage.setItem('listaContactos', JSON.stringify(existingC));
                        }

                        if (dados.entidades && dados.entidades.length > 0) {
                            var existingE = JSON.parse(localStorage.getItem('listaEntidades')) || [];
                            dados.entidades.forEach(function(e) {
                                if (!e.id) e.id = generateId();
                                var found = existingE.some(function(ex) { return ex.id === e.id; });
                                if (!found) existingE.push(e);
                            });
                            localStorage.setItem('listaEntidades', JSON.stringify(existingE));
                        }

                        if (dados.acessos && dados.acessos.length > 0) {
                            var existingA = JSON.parse(localStorage.getItem('accessLog')) || [];
                            dados.acessos.forEach(function(a) {
                                var found = existingA.some(function(e) { return e.data === a.data && e.utilizador === a.utilizador; });
                                if (!found) existingA.push(a);
                            });
                            localStorage.setItem('accessLog', JSON.stringify(existingA));
                        }

                        if (dados.grupos && dados.grupos.length > 0) {
                            var existingG = JSON.parse(localStorage.getItem('gruposContacto')) || [];
                            dados.grupos.forEach(function(g) {
                                var found = existingG.some(function(e) { return e.id === g.id; });
                                if (!found) existingG.push(g);
                            });
                            localStorage.setItem('gruposContacto', JSON.stringify(existingG));
                        }
                    } catch (e) {}
                }
                if (callback) callback();
            }
        };
        xhr.onerror = function() { if (callback) callback(); };
        xhr.send();
    }

    window.loadDadosFromJSON = loadDadosFromJSON;
})();
