module.exports = {
    sejaBemVindo: (nome, nick, hash) => {
        return `<table style="width:100%;" cellspacing="5px"> <tr> <td><img src="https://rtcimages.s3.amazonaws.com/logo3.png" alt="RTChamp - Foto Oficial"><br><i>Leia, responda, divirta-se e ganhe!</i> </td> <td style="background-color:#ffa800"> </td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td>Olá ${nome}, seja muito bem-vindo!</td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td><b>Seu nickname (ID):</b> ${nick}</td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td>Para confirmar a verificação de conta clique no link: <b><a href="https://rtchamp.com/verification/${hash}" target="_blank">https://rtchamp.com/verification/${hash}</a></b> </td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td><i>RTChamp Team | 2020 - Todos os direitos reservados.</i> </td> </tr> </table>`
    },
    recuperaSenha: (nome, nick, hash) => {
        return `<table style="width:100%;" cellspacing="5px"> <tr> <td><img src="https://rtcimages.s3.amazonaws.com/logo3.png" alt="RTChamp - Foto Oficial"><br><i>Leia, responda, divirta-se e ganhe!</i> </td> <td style="background-color:#ffa800"> </td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td>Olá ${nome},</td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td><b>Seu nickname (ID):</b> ${nick}</td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td>Você solicitou pelo link de redefinição de sua senha. Para prosseguir, clique no link: <b><a href="https://rtchamp.com/recuperasenha/${hash}" target="_blank">https://rtchamp.com/recuperasenha/${hash}</a></b> </td> </tr> <tr> <td></td> <td><p>ALERTA! Se você não solicitou este email, não clique no link acima. Entre em contato com nossa equipe de suporte (suporte@rtchamp.com) e solicite uma verificação do caso. Você também pode alterar sua senha imediatamente acessando seu Perfil > Alterar Senha.</p></td> </tr> <tr> <td><p></p></td> <td></td> </tr> <tr> <td></td> <td><i>RTChamp Team | 2020 - Todos os direitos reservados.</i> </td> </tr> </table>`
    }
}