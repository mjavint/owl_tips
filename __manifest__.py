# -*- coding: utf-8 -*-
{
    'name': 'Owl Tips',
    'version': '17.0.1.0',
    'description': """ Owl Tips Description """,
    'summary': """ Owl Tips Summary """,
    'author': 'mjavint',
    'website': 'https://www.youtube.com/@devtoolschool',
    'category': '',
    'depends': ['base', 'web'],
    "data": [
        "views/res_partner_views.xml",
    ],
    'assets': {
        'web.assets_backend': ['owl_tips/static/src/components/**/*'],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
