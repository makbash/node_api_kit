'use strict';

class LearnController {

    Index(req, res) {
        res.render(
                'Learn/Index',
                {
                    title: 'Learn'
                }
        );
    }
    
    Categories(req, res) {
        res.render(
                'Learn/Index',
                {
                    title: 'Learn'
                }
        );
    }
    
    Category(req, res) {
        res.render(
                'Learn/Index',
                {
                    title: 'Learn'
                }
        );
    }

}

module.exports = new LearnController();