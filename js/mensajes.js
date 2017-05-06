var mensajes = [
{
                "idMessage": "102630",
                "type": 1,
                "shortMessage": "Alerta de transacción internacional: Visa-5623",
                "longMessage": "Se denegó una transacción internacional por $1650, ya que excede el monto definido en su perfil.",
                "postdate": "2020-10-10T00:00:00.000Z",
                "state": 3,
                "bulb": 4,
                "idEntity": 1,
                "appends": [{
                                "id": "1011",
                                "fields": [{
                                                "tag": "Comercio",
                                                "value": "Macy's",
                                                "type": "STRING",
                                                "symbol": ""
                                },
                                {
                                                "tag": "Monto",
                                                "value": "1650.0",
                                                "type": "FLOAT",
                                                "symbol": "$"
                                },
                                {
                                                "tag": "Hora",
                                                "value": "2017-05-19 12:18:15",
                                                "type": "DATE",
                                                "symbol": ""
                                }]
                }],
                "services": {
                                "E1-MA02": "Modificar Perfil",
                                "E1-MA03": "Llamarme",
                                "E1-MN03": "Transacción no Reconocida"
                }
},
{
                "idMessage": "1024444",
                "type": 1,
                "shortMessage": "Alerta de transacción internacional: Visa-5623",
                "longMessage": "Se denegó una transacción internacional por $1650, ya que excede el monto definido en su perfil.",
                "postdate": "2020-10-10T00:00:00.000Z",
                "state": 2,
                "bulb": 4,
                "idEntity": 1,
                "appends": [{
                                "id": "1011",
                                "fields": [{
                                                "tag": "Comercio",
                                                "value": "Macy's",
                                                "type": "STRING",
                                                "symbol": ""
                                },
                                {
                                                "tag": "Monto",
                                                "value": "1650.0",
                                                "type": "FLOAT",
                                                "symbol": "$"
                                },
                                {
                                                "tag": "Hora",
                                                "value": "2017-05-19 12:18:15",
                                                "type": "DATE",
                                                "symbol": ""
                                }]
                }],
                "services": {
                                "CAMBIAR---FASE 2: Visa 5623---R7": "Modificar Perfil",
                                "E1-MA03": "Llamarme",
                                "E1-MN03": "Transacción no Reconocida"
                }
},
{
                "idMessage": "102632",
                "type": 1,
                "shortMessage": "Alerta de transacción en ATM: Súper Nómina-2084",
                "longMessage": "Se denegó una transacción realizada en un ATM de Plaza Delta por $2000, por su configuración del perfil de su producto en este canal.",
                "postdate": "2020-10-10T00:00:00.000Z",
                "state": 2,
                "bulb": 4,
                "idEntity": 1,
                "appends": [{
                                "id": "1011",
                                "fields": [{
                                                "tag": "ATM",
                                                "value": "Plaza Delta",
                                                "type": "STRING",
                                                "symbol": ""
                                },
                                {
                                                "tag": "Monto",
                                                "value": "2000.0",
                                                "type": "FLOAT",
                                                "symbol": "$"
                                },
                                {
                                                "tag": "Hora",
                                                "value": "2017-05-20 18:40:10",
                                                "type": "DATE",
                                                "symbol": ""
                                }]
                }],
                "services": {
                                "CAMBIAR---FASE 3: Súper Nómina---R13": "Modificar Perfil",
                                "E1-MA03": "Llamarme",
                                "E1-MN03": "Transacción no Reconocida"
                }
},
{
                "idMessage": "102634",
                "type": 1,
                "shortMessage": "Alerta de transacción en Casino: Amex-2514",
                "longMessage": "Se denegó una transacción realizada en el Casino El Juego $45000, ya que tiene bloqueado en su perfil el uso de su producto en Casinos.",
                "postdate": "2020-10-10T00:00:00.000Z",
                "state": 2,
                "bulb": 4,
                "idEntity": 1,
                "appends": [{
                                "id": "1011",
                                "fields": [{
                                                "tag": "Comercio",
                                                "value": "Casino El Juego",
                                                "type": "STRING",
                                                "symbol": ""
                                },
                                {
                                                "tag": "Monto",
                                                "value": "45000.0",
                                                "type": "FLOAT",
                                                "symbol": "$"
                                },
                                {
                                                "tag": "Hora",
                                                "value": "2017-05-23 15:35:20",
                                                "type": "DATE",
                                                "symbol": ""
                                }]
                }],
                "services": {
                                "CAMBIAR---FASE 1: Amex 2514---R5": "Modificar Perfil",
                                "E1-MA03": "Llamarme",
                                "E1-MN03": "Transacción no Reconocida"
                }
}
]