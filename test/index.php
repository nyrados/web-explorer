<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="../dist/we.css?<?php echo time(); ?>"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"/>
    </head>
    <body>
        
        <div class="container" style="margin-top: 100px">
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="3"><b>Current:</b> <span data-content='we-current'>/</span></td>
                    </tr>
                    <tr>
                        <th colspan="2">Name</th>
                        <th>MIME-Type</th>
                        <th>Path</th>
                        <th>Size</th>
                    </tr>
                    <tbody id="we">

                    </tbody>
                </thead>
            </table>
        </div>


        
        <script src="../dist/web-explorer.js?<?php echo time(); ?>"></script>
        <script>
            webExplorer('we', 'http://localhost/we/web-explorer-server/examples/server.php');
        </script>
    </body>
</html>