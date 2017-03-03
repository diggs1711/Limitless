;
(function() {

    $(document).ready(function() {

        $('.ref').on('click', function() {
            $.ajax({
                url: './sys/server.php'
            }).done(function(res) {
                onData(JSON.parse(res));
            });
        });

    });

    function onData(data) {
        refreshList(data);
    }

    function refreshList(data) {
        if (!data) return null;

        var d;
        var ele;
        var ln = data.list.length;
        document.body.innerHTML = "";

        for (var i = 0,ln = data.list.length; i < ln; i++) {
            d = data.list[i];
            ele = document.createElement('div');
            ele.className = 'list-item';
            ele.innerHTML = d.val + ' ' + d.name;
            document.body.appendChild(ele);
        }
    }
})();
