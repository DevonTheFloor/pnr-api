const Annonce = require('../models/annonce'),
  compressImages = require('compress-images'),
  fs = require('fs'),
  nMailer = require('nodemailer'),
  pnrUrl = 'https://localhost:8443',
  
  confirmMailing = (req, titre, mdp, id, mail) => {
  console.log('IN da MAILER')
  let transporter = nMailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    secure: true,
    dkim: {
      domainName: 'piecederecup.fr',
      keySelector: 'default', // The key you used in your DKIM TXT DNS Record
      privateKey: "MIIEpAIBAAKCAQEAy8wfYxqhDWxa7/E3N5Dc8UXU1PD1jAQTmII7qgrCSD8kUzbDJPclPMuPpOVJFtCA7OLyjaC08c2hDm3T1aEJvkeULYlynzXXojPrnicrIwh6m/IplGqhRnmAOct+D1TokmP+/dXnqqmgie1NmFzJPfGh/FO5y0FvLpnvwJqTQKjuE5j1PwsXuUuNQZjaMR5G2vYRJb9IPRmGB1bMIGxvbsQDMPIUUzXWrv+QUVKgZ5t3zCMIBCMhW/VrnmOPH7YzQhnPpHiwigNZ0V1Mvpl00I7jDBxJ1d6k6juItZJsiRXAXAGsxr9g9NrpPA+/In7TqFiyXQZK8tIeLqQf3HBPKQIDAQABAoIBAQDA24s8Wt/b9xVbiXbKg7FCNeZCGUEVXmo44c2ajhHrEq3KfcFQQv2fObfWwRBYobnP8ri8pD93sDNglzhnKr0wr0YfjbnFxssn+WBYyxI8VfLJjvIgPIQgUCyzBMpnsd9hYXXWOs3AKEP/Im1S6UOb9gVn5sek/Gg9vnkvWFhPT5zqsSpA0xBI4tM/i69mj+5IXtCX3IV6CSyo2b5N9wqzyM0R6UL2a9QZqUFW+wZdMdY5lUFbhxcnFA+HHgnDTEqfIKUUIs6+OeYNYbM+P/KUzKthKMESfjyj0lvrS8HZNAnYHRD80iP3SOXNEej5/7tZE7keqLdp4XweTPZXgxwBAoGBAPIZjVm81lY4R6aj92mZ5SF/Dvo6/sQbM66fsWHqmr+33TBQbU1zdQZTa35Acnk2sB9q/X+d8Frro6Aiooog0wSKvg/J3eDaxOinNPIFzhLRf6a7IwIbAHNwKP08bt/Ag6VFV1DdKZfdBt6DK71u0mrr86alFHdatXqh+QyM+L6pAoGBANd/lzVyC2hXHBSr/cx/obUBCanx/dyTZoWOJfcd7ReNpH25/A2nd8IuUwAdAGCMtSiGSDsnL6XKolmQhtXCniARttC8xhmDfsSdVfOFBfGyhG0i2GwWGC356/ndDpN+0gQOEmL4rPnoA0aLzNQ8IFPpgK4sahWpJ+UxuqWXp9yBAoGBAKhp6hCg8qFr6TwdGAGYEvLoRm0AGTYmjh9N68FnyFrR9sajTEXyqVfLNB3Ri1CTIJXagZoDLq6w+VRug49/Igwoz+p/zR+cUBpgJs6uBxrELf64c7QFQJ0NSxZOsfppG6sev4z7LPH9yceEjCrtKudCWG52q/QTX+d9QZjfgDJxAoGAB39A23MkQnUFXRK+uaaXEZz/oRHyKwJVxr+zQm2gGfmrh1Q5GKCC4haKfK6FnNZIVyiUyroKRlJOY59LkZQ7vBHhslFe8vRILL7shpRSKJ51TPaxYNFD9hWDyCWQpED9PXbf3OGZ4vfXZVTnw1p0JXcyKt0Qs8A2yxp3y9sC1AECgYBgKkUHQ91YI8jDUWvzMW0FOLMjnRvfSGd1sKAQUpWBo81xEFFT17hpwYOa/2FFTB3J/NlAsVpKWAe/obzMUcAQISxXjOKivU8wjn0/ljNQnDaiBiPGrVKxncVXPiv1qyxAO0sk45klgJNIJnyyg9NsrjzWA4V6Jd8wevhmemd9pg==", // Content of you private key
    }
  });
  transporter.sendMail({
    to: `${mail}`,
    from: '"Piece de Recup\'" <confirm@piecederecup.fr>', // Make sure you don't forget the < > brackets
    subject: `votre annonce ${titre}`,
    text: `Votre annonce ${titre} est bien disponible sur piecederecup.fr, votre mot de passe est: ${mdp}`, // Optional, but recommended
    html: `<h1>Votre annonce sur Piece de Recup'</h1><br /><p>Votre annonce <strong>${titre}</strong> est bien disponible sur <a href="https://piecederecup.fr" target="_blank">piecederecup.fr</a> à l'adresse :<br /><a href="${req.protocol}://${req.get('host')}/page/annonce.html?id=${id}">${req.protocol}://${req.get('host')}/page/annonce.html?id=${id}</a> <br />Le mot de passe que vous avez choisi pour la supprimer est : <i>${mdp}</i><br />Elle sera disponible en ligne tant que vous ne l'aurez pas supprimé. <br />En vous souhaitant une bonne vente sur pieccederecup.fr .<br /><br/>Ceci est mail automatique, merci de ne pas répondre.</p>`, // Optional
  })
}

const compressPhoto = (req, res) => {
  let INPUT_path = `${req.file.path}`;
  const entree = Date.now();
  console.log('entrée :',entree);
  console.log('Into CompressPhoto path = ', req.file.path);
  let OUTPUT_path = './images/comp-';
    compressImages(
      INPUT_path, 
      OUTPUT_path, 
      { compress_force: false, statistic: true, autoupdate: true }, false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
      { png: { engine: "pngquant", command: ["--quality=20-35", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      { gif: { engine: "gifsicle", command: ["--colors", "80", "--use-col=web"] } },
      function (error, completed, statistic) {
        if (statistic.size_output) {
          console.log("------Rapport de compression------");
          console.log('Completed :',completed);
          console.log('Statistic :', statistic);
          console.log('Erreur :', error);
          console.log("------------------------------");
        } else {
          console.log('Completed :', completed);
          console.log('PROBLEME DE COMPRESSION');
          console.log('Erreur :', error);
        }
      }
    )
    const delFile = `./temp/${req.file.filename}`;
    console.log('url to del :', delFile);
}

exports.delFile = (req) => {
  const delFile = req.body.delUri;
    console.log('url to del :', delFile);
      fs.unlink(delFile,
        (err) => {
          if (err) {
            console.error(`Error delete file: ${delFile}`);
          } else {
            console.error(`\nDeleted file: ${delFile}`);
          }
        })
}
exports.getAll= (req, res) => {
  Annonce.find()
    .then((all)=> {
      res.status(200).json(all);
  })
  .catch(error => console.error(error));
}

exports.getAccueil= (req, res) => {
  Annonce.find().limit(10)
    .then((all)=> {
      console.log('all :',all)
      res.status(200).json(all);
  })
  .catch(error => console.error(error));
}

exports.getOne = (req, res) => {
  Annonce.findOne({
    _id: req.params.id
  })
  .then((result) => {
    res.status(200).json(result);
  })
  .catch(error => console.error(error));
}

exports.getRecherche = (req, res) => {
  console.log('req search :', req.body);
  const reqArray = Object.values(req.body);
  console.log('reqArray :',reqArray);
  const size = reqArray.length;
  console.log('req search length :', size);
  const categorie = req.body.categorie;
  const objet = req.body.objet;
  const piece = req.body.piece;
  const region = req.body.region;
  const departement = req.body.departement;
  const marque = req.body.marque;
  const modele = req.body.modele;
  const annee = req.body.annee;
  const Recherche = {
    categorie: categorie,
    objet: objet,
    piece: piece,
    region: region,
    departement: departement
  };
  const details = [
    {marque: marque},
    {modele: modele},
    {annee: annee}
  ];
  const queryBase = Annonce.find({...Recherche});
  
  if (marque || modele || annee) {
    switch (size) {
      case 7:
        delete Recherche.departement;
        console.log('Recherche :', Recherche);
        break;
      case 6:
        delete Recherche.departement;
        delete Recherche.region;
        console.log('Recherche :', Recherche);
        break;
      default:
        console.error('Full search');
        break;
    }
    const findWithDetails = Annonce.find(
      {
        /* categorie: req.body.categorie,
        objet: req.body.objet,
        piece: req.body.piece,
        region: req.body.region,
        departement: req.body.departement, */
        ...Recherche,
        $or: details
      });
    findWithDetails
    .then((match) => {
      if (match.length == 0) {
        res
          .status(200)
          .json({ 
            result: 0 
          })
      } else {
        res
          .status(200)
          .json(match)
      }
    })
    .catch(error => console.error(error));
  } else {
    queryBase
    .then((match) => {
      if (match.length == 0) {
        res
          .status(200)
          .json({ 
            result: 0 
          })
      } else {
        res
          .status(200)
          .json(match)
      }
    })
    .catch(error => console.error(error));
  }
  
}

exports.postAnnonce = (req, res) => {
  const ladate = new Date();
  console.log('req.post :', req.body)
    const annonce = new Annonce({
      ...req.body,
      urlImg: `${req.protocol}://${req.get('host')}/engin/images/comp-${req.file.filename}`,
      date: ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear(),
      heure: ladate.getHours()+":"+ladate.getMinutes()+":"+ladate.getSeconds()
    })
    annonce.save()
    .then( (annonce) => {
      compressPhoto(req, res);
      const apres = Date.now();
      const delFile = `./temp/${req.file.filename}`;
      const mdp = req.body.mdp;
      const titre = req.body.titre;
      console.log('ID :', annonce._id);
      const mail = annonce.email;
      console.log('Mail :', annonce.email);
      console.log('Mot de passe dans annonce :', mdp);
      console.log('url to del :', delFile);
      console.log('Apres compPhoto :', apres);
      console.log(' annonce_id :', annonce._id);
      const aid = annonce._id;
      confirmMailing(req, titre, mdp, aid, mail)
      res.status(201).json({
        message: 'Votre annonce est bien enregistrée sur le site.\n Un email de confirmation vous a été envoyé.\nVérifiez dans le dossier SPAM si nécessaire.',
        aid: aid,
        codeOp:200,
        uriDel: delFile
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: `Il y a eu un probleme avec votre photo\nVeuillez réitérer votre demande`,
        aid: aid,
        codeOp: 500
      });
    });
  
}

exports.delAnnonce = (req, res) => {
  console.log('into del annonce');
  const id = req.body.id;
  console.log('id :', id);
  const mdp = req.body.mdp;
  console.log('mdp :', mdp);
  console.log('req :', req.body);
  Annonce.findOne({
    _id: id
  })
    .then((todel) => {
      setTimeout(function(){
        if (todel) {
          if (todel.mdp === mdp) {
            
            const filename = todel.urlImg.split('/images/')[1];
            console.log('file name to del : ', filename);
            fs.unlink(`images/${filename}`, () => {
              Annonce.deleteOne({ _id: req.body.id })
                .then(() => res.status(200).json({message: '/page/message/confirmation-suppression.html'}))
                .catch(() => res.status(500));
            });
          } else {
            res.status(403);
          }
        }else {
          res.status(404);
        }
      }, 500);
      
    })
    .catch(() => res.status(500));
}