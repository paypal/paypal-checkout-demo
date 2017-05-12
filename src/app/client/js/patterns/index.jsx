
import { client } from './client';
import { server } from './server';
import { braintree } from './braintree';
import { styles } from './styles';
import { credit } from './credit';
import { pay } from './pay';
import { mark } from './mark';
import { confirm } from './confirm';
import { validation } from './validation';

export let patterns = [

    {
        name: 'Integration Types',
        patterns: [
            client, server, braintree
        ]
    },

    {
        name: 'Button Styles',
        patterns: [
            styles, credit, pay
        ]
    },

    {
        name: 'Checkout Customizations',
        patterns: [
            mark, confirm, validation
        ]
    }
];
