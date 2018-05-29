const mongoose = require('mongoose')

const Board = mongoose.model('Board')
const Customer = mongoose.model('Customer')
const Product = mongoose.model('Product')
const User = mongoose.model('User')

Board.count({}, (err, count) => {
  if (count === 0) {
    Board.create(
      {
        title: 'Professor',
        content:
          'viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris'
      },
      {
        title: 'Payment Adjustment Coordinator',
        content:
          'vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium'
      },
      {
        title: 'Dental Hygienist',
        content:
          'odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique'
      },
      {
        title: 'Geological Engineer',
        content:
          'convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit'
      },
      {
        title: 'Graphic Designer',
        content:
          'in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis'
      },
      {
        title: 'Research Nurse',
        content:
          'rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede'
      },
      {
        title: 'Nurse',
        content:
          'accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris'
      },
      {
        title: 'Senior Cost Accountant',
        content:
          'mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam'
      },
      {
        title: 'Geological Engineer',
        content:
          'viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra'
      },
      {
        title: 'Community Outreach Specialist',
        content:
          'eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum'
      },
      {
        title: 'Account Coordinator',
        content:
          'nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id'
      },
      {
        title: 'Systems Administrator II',
        content: 'vestibulum proin eu mi nulla ac enim in tempor turpis'
      },
      {
        title: 'Systems Administrator III',
        content:
          'primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices'
      },
      {
        title: 'Business Systems Development Analyst',
        content:
          'nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper'
      },
      {
        title: 'Account Representative III',
        content:
          'neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus'
      },
      {
        title: 'Financial Analyst',
        content:
          'aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu'
      },
      {
        title: 'Office Assistant II',
        content:
          'ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque'
      },
      {
        title: 'Professor',
        content:
          'cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit'
      },
      {
        title: 'Quality Control Specialist',
        content:
          'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci'
      },
      {
        title: 'Media Manager III',
        content:
          'vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis'
      }
    )
  }
})

Customer.count({}, (err, count) => {
  if (count === 0) {
    Customer.create(
      {
        name: 'Levin Schollick',
        tel: '(237) 7118825',
        cellphone: '+48 475 755 8358',
        memo: 'system engine'
      },
      {
        name: 'Lucias Huish',
        tel: '(426) 2407296',
        cellphone: '+504 195 670 1020',
        memo: 'pricing structure'
      },
      {
        name: 'Ansley Freen',
        tel: '(273) 8243550',
        cellphone: '+250 486 432 2560',
        memo: 'User-centric'
      },
      {
        name: 'Eduardo Bertenshaw',
        tel: '(943) 7985212',
        cellphone: '+30 914 276 3975',
        memo: 'local'
      },
      {
        name: 'Coreen Emeline',
        tel: '(344) 6836134',
        cellphone: '+48 277 775 0528',
        memo: 'interface'
      },
      {
        name: 'Germain Feary',
        tel: '(561) 2442022',
        cellphone: '+420 440 190 1784',
        memo: 'Configurable'
      },
      {
        name: 'Noella MacMaykin',
        tel: '(798) 3682262',
        cellphone: '+86 397 161 9059',
        memo: 'Face to face'
      },
      {
        name: 'Giorgia Abbots',
        tel: '(514) 2826060',
        cellphone: '+380 155 695 7626',
        memo: 'Universal'
      },
      {
        name: 'Cletis Schechter',
        tel: '(120) 7375978',
        cellphone: '+63 890 342 1069',
        memo: 'algorithm'
      },
      {
        name: 'Consuela Margerison',
        tel: '(865) 8019772',
        cellphone: '+86 708 318 1758',
        memo: 'emulation'
      },
      {
        name: 'Giulio Berg',
        tel: '(218) 3512242',
        cellphone: '+1 571 794 7110',
        memo: 'function'
      },
      {
        name: 'Rene Braham',
        tel: '(343) 7285813',
        cellphone: '+48 319 896 0915',
        memo: 'Visionary'
      },
      {
        name: 'Rodge Viall',
        tel: '(663) 1546421',
        cellphone: '+47 817 430 5722',
        memo: 'benchmark'
      },
      {
        name: 'Wenda Davidowich',
        tel: '(444) 2884586',
        cellphone: '+353 987 436 9003',
        memo: 'national'
      },
      {
        name: 'Marcel Anderson',
        tel: '(298) 7435794',
        cellphone: '+86 900 796 1852',
        memo: 'capability'
      },
      {
        name: 'Eugenie Tansly',
        tel: '(218) 4136341',
        cellphone: '+86 341 944 2170',
        memo: 'Balanced'
      },
      {
        name: 'Hestia Dyter',
        tel: '(144) 5630592',
        cellphone: '+81 615 502 6544',
        memo: 'radical'
      },
      {
        name: 'Roma Gamlyn',
        tel: '(932) 5594228',
        cellphone: '+86 410 667 1626',
        memo: 'incremental'
      },
      {
        name: 'Illa Abramamov',
        tel: '(408) 5770167',
        cellphone: '+7 763 149 2997',
        memo: 'foreground'
      },
      {
        name: 'Nappie Gair',
        tel: '(743) 6959837',
        cellphone: '+242 503 735 9904',
        memo: 'algorithm'
      }
    )
  }
})

Product.count({}, (err, count) => {
  if (count === 0) {
    Product.create(
      {
        title: 'Zap APF',
        content:
          'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque',
        price: 129,
        hide: true
      },
      {
        title: 'Cefdinir',
        content:
          'in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet',
        price: 99,
        hide: true
      },
      {
        title: 'Blemish Control Blotting Paper',
        content:
          'enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin',
        price: 29,
        hide: true
      },
      {
        title: 'Rough (Redroot) Pigweed',
        content:
          'nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis',
        price: 49,
        hide: true
      },
      {
        title: 'SANITAXE',
        content:
          'turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem',
        price: 399,
        hide: true
      },
      {
        title: 'Good Neighbor Pharmacy',
        content:
          'tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo',
        price: 499,
        hide: true
      },
      {
        title: 'Ferrum sidereum Pancreas 10/4 Special Order',
        content:
          'id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi',
        price: 19,
        hide: true
      },
      {
        title: 'ACT Anticavity Fluoride Kids Bubblegum',
        content:
          'ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        price: 122,
        hide: true
      },
      {
        title: 'ELF Zit Zapper',
        content:
          'ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut',
        price: 11,
        hide: true
      },
      {
        title: 'Clonidine Hydrochloride',
        content:
          'aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan',
        price: 1299,
        hide: true
      },
      {
        title:
          'Amazonian Colored Clay Foundation Broad Spectrum SPF 15 Sunscreen',
        content:
          'pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero',
        price: 190,
        hide: true
      },
      {
        title: 'Amoebatox',
        content:
          'mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci',
        price: 100,
        hide: true
      },
      {
        title: 'Grapefruit',
        content:
          'luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus',
        price: 55,
        hide: true
      },
      {
        title: 'Leader nite time',
        content:
          'sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus',
        price: 39,
        hide: true
      },
      {
        title: 'butalbital, acetaminophen and caffeine',
        content:
          'ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel',
        price: 44,
        hide: true
      },
      {
        title: 'Midazolam hydrochloride',
        content:
          'velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus',
        price: 77,
        hide: true
      },
      {
        title: 'Mosquito',
        content:
          'pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat',
        price: 44,
        hide: true
      },
      {
        title: 'kirkland signature minoxidil',
        content:
          'eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed',
        price: 188,
        hide: true
      },
      {
        title: 'St. Ives',
        content: 'donec dapibus duis at velit eu est congue elementum in',
        price: 122,
        hide: true
      },
      {
        title: 'Zantac 150',
        content:
          'quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec',
        price: 9,
        hide: true
      }
    )
  }
})

User.count({}, (err, count) => {
  if (count === 0) {
    User.create({
      email: 'admin@gmail.com',
      password: 'admin'
    })
  }
})
