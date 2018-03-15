app.controller('homeController', function($http){
    var self = this;
    self.people = {};
    self.server = {};
    self.event = {};
    self.events = {}
    self.newestshow = {};

    $http.get('/api/security/lastevent')
        .then(function(response){
            self.event = response.data;
        });

    $http.get('/api/users/list')
        .then(function(response){
            self.people = response.data;
        });

    $http.get('/api/server')
        .then(function(response){
            self.server = response.data;
        });

    $http.get('/api/media/newest/true')
        .then(function(response){
            self.newestshow = response.data;
        });

    $http.get('/api/events/3')
        .then(function(response){
            self.events = response.data
        });
});

app.controller('mediaController', function($http){
    var self = this;
    self.shows = {};
    self.modal = null;
    self.showModal = false;

    self.grow = function(show){
        self.showModal = !self.showModal;
        self.modal = show;
    }

    $http.get('/api/media/newest')
        .then(function(response){
            self.shows = response.data;
        });
});

app.controller('controlsController', function($http){
    var self = this;
    self.garage = function(){
        $http.get('/api/control/garage')
            .then(function(response){
                
            })
    }
});

app.controller('securityController', function($http){
    var self = this;
    self.todayseventcount = null;
    self.status = {};
    self.cam1 = '';
    self.cam2 = '';
    self.event = {};
    self.showModal = false;
    self.days = {};
    self.selected = undefined;

    function status(){
        $http.get('/api/security/status')
        .then(function(response){
            self.status = response.data;
        });
    }

    self.getDay = function(day){
        $http.get('/api/security/todaysevents/' + day)
            .then(function(response){
                self.events = response.data;
            });
    }

    self.getDay();

    $http.get('/api/security/todayseventcount')
        .then(function(response){
            self.todayseventcount = response.data;
        })    

    $http.get('/api/security/camera/1')
        .then(function(response){
            self.cam1 = response.data;
        });

    $http.get('/api/security/camera/2')
        .then(function(response){
            self.cam2 = response.data;
        });

    $http.get('/api/security/days')
        .then(function(response){
            self.days = response.data;
        });

    self.toggle = function(){
        jQuery('#toggle-security').removeClass('fa-ban')
        jQuery('#toggle-security').removeClass('fa-video-camera')
        jQuery('#toggle-security').addClass('fa-repeat')
        jQuery('#toggle-security').addClass('fa-spin')
        $http.get('/api/security/state')
            .then(function(response){
                jQuery('#toggle-security').removeClass('fa-repeat')
                jQuery('#toggle-security').removeClass('fa-spin');
                status();
            });
    }

    status();
});

app.controller('servicesController', function($http){
    var self = this;
    self.server = {};
    self.drives = {};
    self.devices = {};

    $http.get('/api/server')
        .then(function(response){
            self.server = response.data;
        });

    $http.get('/api/server/drives')
        .then(function(response){
            self.drives = response.data;
        });

    $http.get('/api/server/network')
        .then(function(response){
            self.devices = response.data;
        });
});

app.controller('climateController', function($http){

})

app.controller('eventController', function($http){
    var self = this;
    self.items = {}

    $http.get('/api/events')
        .then(function(response){
            self.items = response.data
        })
})

app.filter('normalizeTime', function(){
    return function(timestamp){
        var date = new Date(timestamp);
        return(moment.unix(timestamp).format("dddd, MMMM Do YYYY h:mm a"));
    }
});

app.filter('fromNow', function(){
    return function(timestamp){
        return(moment.unix(timestamp).fromNow());
    }
});