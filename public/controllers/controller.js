var tabsDemoIconTabs = angular.module('tabsDemoIconTabs', ['ngRoute', 'ngMaterial', 'ngSanitize'] );

tabsDemoIconTabs.config(['$routeProvider', function ($routeProvider){
  $routeProvider
  .when('/login',{
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/admin', {
      templateUrl: 'views/ad.html',
      controller: 'AdCtrl'
  })
  .when('/admin/:id', {
      templateUrl: 'views/admin.html',
      controller: 'AdminCtrl'
  })
  .when('/main/:name', {
      templateUrl: 'views/project.html',
      controller: 'ProjCtrl'
  })
  .when('/main/:name/:id', {
    templateUrl: 'views/main.html',
    controller: 'AppCtrl'
  })
  .otherwise({
      redirectTo: '/login'
  });
}]);

tabsDemoIconTabs.controller('AppCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$http', '$window', '$location', function($scope, $timeout, $mdSidenav, $log, $http, $window, $location){
  $scope.dat = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false
  };

  $scope.data1 = {
    Label1: "General Information",
    Label2:   "Requirements, Summary and KPI"
  };
  $scope.data2 = {
    Label3: "Device Onboarding",
    Label4:   "Alert Notification Rules",
    Label5: "Service-Impact-Analysis",
    Label6:   "Alert Response Procedures",
    Label7: "Event Management Rules",
    Label8:   "Alert Auto Remediation"
  };
  $scope.data3 = {
    Label9: "Web-App Basic Monitoring",
    Label10:   "Web-App Advanced Monitoring",
    Label11: "Alert Notification and Tresholds"
  };
  $scope.data4 = {
    Label12:   "Log Monitoring and Analysis"
  };
  $scope.data5 = {
      Label13: "Application Performance Analysis"
  } ;
  $scope.data6 = {
      Label14:   "CCP Open Stack Analysis"
  };
  $scope.data7 = {
      Label15: "Database Insight Monitoring",
  };
  $scope.data8 = {
    Label16: "Network Performance Monitoring"
  };

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  };

  var tabs = [ "General Information", "Requirements, Summary and KPI" ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old && (old != current)) $log.debug('Goodbye ' + previous + '!');
      if ( current + 1 )            $log.debug('Hello ' + selected + '!');
    });

    $scope.addTab = function (title) {
      tabs.indexOf(title) === -1 ? tabs.push(title) : console.log("This item already exists");
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };

    $scope.isDisabled = false;

    $scope.edit = function(){
      $scope.config = {
        projectId: $window.id,
            name: $scope.contact.name,
            title: $scope.contact.title,
            bu: $scope.contact.bu,
            deptId: $scope.contact.deptId,
            app_name: $scope.app.name,
            app_sname: $scope.app.sname,
            cmdb: $scope.app.id,
            tier: $scope.app.tier,
            env: $scope.app.env
      };
      console.log($scope.config);
      $http({
        method: "POST",
        url: "/edit",
        data: $scope.config
      })
      .then(function(response){
        console.log(response.data);
        console.log("Updated");
      })
    }

    $scope.gen = function(){
    $scope.config = {
          projectId: $window.id,
          name: $scope.contact.name,
          title: $scope.contact.title,
          bu: $scope.contact.bu,
          deptId: $scope.contact.deptId,
          app_name: $scope.app.name,
          app_sname: $scope.app.sname,
          cmdb: $scope.app.id,
          tier: $scope.app.tier,
          env: $scope.app.env
    };
    console.log($scope.config);
    $http({
        method: "POST",
        url: "/general",
        data: $scope.config
    })
    .then(function(response){
      console.log(response.data);
      console.log("data inserted");
      $scope.isDisabled = true;
    });
  }

  $scope.reqmnt = function(){
  $scope.config = {
    projectId: $window.id,
        brd: $scope.brd,
        ask: $scope.ask,
        ahk: $scope.ahk,
        ihk: $scope.ihk,
  };
  console.log($scope.config);
  $http({
      method: "POST",
      url: "/req",
      data: $scope.config
  })
  .then(function(response){
    console.log(response.data);
    console.log("data inserted");
    $scope.isDisabled = true;
  });
}

$scope.webapp = function(){
$scope.config = {
  projectId: $window.id,
      wurl: $scope.wurl,
      soapm: $scope.soapm,
      sslcm: $scope.sslcm,
};
console.log($scope.config);
$http({
    method: "POST",
    url: "/webapp",
    data: $scope.config
})
.then(function(response){
  console.log(response.data);
  console.log("data inserted");
  $scope.isDisabled = true;
});
}

$scope.alertnt = function(){
$scope.config = {
  projectId: $window.id,
      notpro: $scope.notpro,
      trp: $scope.trp,
};
console.log($scope.config);
$http({
    method: "POST",
    url: "/alertnt",
    data: $scope.config
})
.then(function(response){
  console.log(response.data);
  console.log("data inserted");
  $scope.isDisabled = true;
});
}

$scope.logmn = function(){
$scope.config = {
  projectId: $window.id,
      hstinfo: $scope.hstinfo,
      dc: $scope.dc,
      da: $scope.dc,
      di: $scope.di,
      imp: $scope.imp
};
console.log($scope.config);
$http({
    method: "POST",
    url: "/logmn",
    data: $scope.config
})
.then(function(response){
  console.log(response.data);
  console.log("data inserted");
  $scope.isDisabled = true;
});
}

$scope.appperf = function(){
$scope.config = {
  projectId: $window.id,
      appsum: $scope.appsum,
      ahkpi: $scope.ahkpi,
      aperf: $scope.aperf,
      apptech: $scope.apptech,
      currpast: $scope.currpast,
      ppenv: $scope.ppenv,
      perfa: $scope.perfa
};
console.log($scope.config);
$http({
    method: "POST",
    url: "/appperf",
    data: $scope.config
})
.then(function(response){
  console.log(response.data);
  console.log("data inserted");
  $scope.isDisabled = true;
});
}

$scope.getcmdb = function(){
  $http({
    method: "GET",
    url: "/cmdb",
    data: $scope.test
  })
  .then(function(response){
    console.log(response.data);
    $scope.testing = response.data;
  });

  $http({
    method: "GET",
    url: "/severity",
    data: $scope.severity
  })
  .then(function(response){
    console.log(response.data);
    $scope.severity = response.data;
  });

  $http({
    method: "GET",
    url: "/threshold",
    data: $scope.threshold
  })
  .then(function(response){
    console.log(response.data);
    $scope.threshold = response.data;
  });

}

  $scope.cmd = function(ch) {
    console.log(ch);
    $http({
      method: "GET",
      url: "/cmdb/" + ch,
      data: ch.class
    })
    .then(function(response){
      console.log(response.data);
      $scope.test = response.data;
    })
  }

  $scope.c1 = function(ch){
    console.log(ch);
    $http({
      method: "GET",
      url: "/rhel/" + ch,
      data: $scope.rhel
    })
    .then(function(response){
      console.log(response.data);
      $scope.rhel = response.data;
      console.log("Data received");
    });
  }

  $scope.yesno = [{id:1, name: 'Yes'}, {id: 2, name: 'No'}];

  $scope.ex = function(ids){
    console.log(ids);
    $http({
      method: "GET",
      url: "/subrhel/" + ids,
      data: $scope.dev
    })
    .then(function(response){
      console.log(response.data);
      $scope.dev = response.data;
    });
  }

$scope.add = [{projectId: null, cmdb:null, server:null, sub:null, sub1:null, thres:null, svrt:null, inp1:null,
yn1:null, yn2:null, yn3: null, yn4: null, inp2: null}];

$scope.addPerson = function(){
  var person = {
    projectId: $window.id,
    cmdb: $scope.cmdb,
    server: $scope.server,
    sub: $scope.sub,
    sub1: $scope.sub1,
    thres: $scope.thres,
    svrt: $scope.svrt,
    inp1: $scope.inp1,
    yn1: $scope.yn1,
    yn2: $scope.yn2,
    yn3: $scope.yn3,
    yn4: $scope.yn4,
    inp2: $scope.inp2
  };
   $scope.add.push(person);
   console.log($scope.add);
}

$scope.divon = [
  {projectId: null, hstname: null, cmdb: null, server:null, ip: null, env: null, prodstate: null, os: null, itfunc: null, ci: null, addcmt: null}
];
$scope.addData = function(){
  var person = {
    projectId: $window.id,
    hstname: $scope.hstname,
    cmdb: $scope.cmdb,
    server: $scope.server,
    ip: $scope.ip,
    env: $scope.env,
    prodstate: $scope.prodstate,
    os: $scope.os,
    itfunc: $scope.itfunc,
    ci: $scope.ci,
    addcmt: $scope.addcmt,
  };
   $scope.divon.push(person);
}

$scope.event = function(){
    console.log($scope.add);
    $http({
        method: 'POST',
        url: '/event',
        data: $scope.add
    })
    .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
          $scope.isDisabled = true;
    });
}

$scope.divonb = function(){
  console.log($scope.divon);
  $http({
    method: 'POST',
    url: '/divon',
    data: $scope.divon
  })
  .then(function(response){
    console.log(response.data);
    $scope.isDisabled = true;
  })
}

$scope.alertnot = function(){
  console.log($scope.alert);
  $http({
    method: 'POST',
    url: '/alert',
    data: $scope.alert
  })
  .then(function(response){
    console.log("Data Inserted");
    $scope.isDisabled = true;
  })
}

$scope.alert = [
  {projectId: null, svrt: null, yn1: null, yn2: null, da: null, ra: null, address: null, rmks: null}
];

$scope.addRule = function(){
  var person = {
    projectId: $window.id,
    svrt: $scope.svrt,
    yn1: $scope.yn1,
    yn2:$scope.yn2,
    da: $scope.da,
    ra: $scope.ra,
    address: $scope.address,
    rmks: $scope.rmks
  }
  console.log($scope.alert);
  $scope.alert.push(person);
  console.log($scope.alert);
}

$scope.arp = [
  {projectId: null, host: null, monitor: null, state: null, pc: null, ts: null}
];

$scope.addPro = function(){
  var person={
    projectId: $window.id,
    host: $scope.host,
    monitor: $scope.monitor,
    state: $scope.state,
    pc: $scope.pc,
    ts: $scope.ts
  }
  console.log(person);
  $scope.arp.push(person);
  console.log($scope.arp);
}

$scope.alertres = function(){
  console.log($scope.arp);
  $http({
    method: 'POST',
    url: '/alertr',
    data: $scope.arp
  })
  .then(function(response){
    console.log("Data Inserted");
    $scope.isDisabled = true;
  })
}

$scope.aard = [
  {projectId: null, mntr: null, script: null, ct: null, cmnd: null, cc: null, ev: null, rmks: null}
];

$scope.addaar = function(){
  var person={
    projectId: $window.id,
    mntr: $scope.mntr,
    script: $scope.script,
    ct: $scope.ct,
    cmnd: $scope.cmnd,
    cc: $scope.cc,
    ev: $scope.ev,
    rmks: $scope.rmks
  }
  $scope.aard.push(person);
}

$scope.aar = function(){
  console.log($scope.aard);
  $http({
    method: 'POST',
    url: '/alertrd',
    data: $scope.aard
  })
  .then(function(response){
    console.log("Data Inserted");
    $scope.isDisabled = true;
  })
}

$scope.webdata = function(){
  $http({
    method: "GET",
    url: "/webtype",
    data: $scope.wt
  })
  .then(function(response){
    console.log(response.data);
    $scope.wt = response.data;
  });
  $http({
    method: "GET",
    url: "/chkfreq",
    data: $scope.cf
  })
  .then(function(response){
    console.log(response.data);
    $scope.cf = response.data;
  });
  $http({
    method: "GET",
    url: "/pollerlocations",
    data: $scope.pl
  })
  .then(function(response){
    console.log(response.data);
    $scope.pl = response.data;
  });
  $http({
    method: "GET",
    url: "/httpmethod",
    data: $scope.hm
  })
  .then(function(response){
    console.log(response.data);
    $scope.hm = response.data;
  });
  $http({
    method: "GET",
    url: "/status",
    data: $scope.kstatus
  })
  .then(function(response){
    console.log(response.data);
    $scope.kstatus = response.data;
  });
  $http({
    method: "GET",
    url: "/action",
    data: $scope.acex
  })
  .then(function(response){
    console.log(response.data);
    $scope.acex = response.data;
  });
}

$scope.tag = false;
$http({
  method: "GET",
  url: "/genapp",
  data: $scope.genapps
})
.then(function(response){
  //console.log(response.data);
  $scope.genapps = response.data;
  console.log($scope.genapps);
  for(var i=0; i < $scope.genapps.length; i++)
  {
    console.log($scope.genapps[i].projectId);
    if($window.id == $scope.genapps[i].projectId)
      $scope.tag = true;
  }
});

$scope.tag1 = false;
$http({
  method: "GET",
  url: "/reqapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.reqapps = response.data;
  console.log($scope.reqapps);
  for(var i=0; i < $scope.reqapps.length; i++)
  {
    console.log($scope.reqapps[i].projectId);
    if($window.id == $scope.reqapps[i].projectId)
      $scope.tag1 = true;
  }
});

$scope.tag2 = false;
$http({
  method: "GET",
  url: "/alertautoapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.alertautoapps = response.data;
  console.log($scope.alertautoapps);
  for(var i=0; i < $scope.alertautoapps.length; i++)
  {
    console.log($scope.alertautoapps[i].projectId);
    if($window.id == $scope.alertautoapps[i].projectId)
      $scope.tag2 = true;
  }
});

$scope.tag3 = false;
$http({
  method: "GET",
  url: "/antapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.antapps = response.data;
  console.log($scope.antapps);
  for(var i=0; i < $scope.antapps.length; i++)
  {
    console.log($scope.antapps[i].projectId);
    if($window.id == $scope.antapps[i].projectId)
      $scope.tag3 = true;
  }
});

$scope.tag4 = false;
$http({
  method: "GET",
  url: "/anotapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.anotapps = response.data;
  console.log($scope.anotapps);
  for(var i=0; i < $scope.anotapps.length; i++)
  {
    console.log($scope.anotapps[i].projectId);
    if($window.id == $scope.anotapps[i].projectId)
      $scope.tag4 = true;
  }
});

$scope.tag5 = false;
$http({
  method: "GET",
  url: "/aresapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.aresapps = response.data;
  console.log($scope.aresapps);
  for(var i=0; i < $scope.aresapps.length; i++)
  {
    console.log($scope.aresapps[i].projectId);
    if($window.id == $scope.aresapps[i].projectId)
      $scope.tag5 = true;
  }
});

$scope.tag6 = false;
$http({
  method: "GET",
  url: "/appapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.appapps = response.data;
  console.log($scope.appapps);
  for(var i=0; i < $scope.appapps.length; i++)
  {
    console.log($scope.appapps[i].projectId);
    if($window.id == $scope.appapps[i].projectId)
      $scope.tag6 = true;
  }
});

$scope.tag7 = false;
$http({
  method: "GET",
  url: "/divonapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.divonapps = response.data;
  console.log($scope.divonapps);
  for(var i=0; i < $scope.divonapps.length; i++)
  {
    console.log($scope.divonapps[i].projectId);
    if($window.id == $scope.divonapps[i].projectId)
      $scope.tag7 = true;
  }
});

$scope.tag8 = false;
$http({
  method: "GET",
  url: "/evtapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.divonapps = response.data;
  console.log($scope.divonapps);
  for(var i=0; i < $scope.divonapps.length; i++)
  {
    console.log($scope.divonapps[i].projectId);
    if($window.id == $scope.divonapps[i].projectId)
      $scope.tag8 = true;
  }
});

$scope.tag9 = false;
$http({
  method: "GET",
  url: "/logapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.divonapps = response.data;
  console.log($scope.divonapps);
  for(var i=0; i < $scope.divonapps.length; i++)
  {
    console.log($scope.divonapps[i].projectId);
    if($window.id == $scope.divonapps[i].projectId)
      $scope.tag9 = true;
  }
});

$scope.tag10 = false;
$http({
  method: "GET",
  url: "/webbasicapp",
})
.then(function(response){
  //console.log(response.data);
  $scope.divonapps = response.data;
  console.log($scope.divonapps);
  for(var i=0; i < $scope.divonapps.length; i++)
  {
    console.log($scope.divonapps[i].projectId);
    if($window.id == $scope.divonapps[i].projectId)
      $scope.tag10 = true;
  }
});

$scope.finalsubmit = function(){
    console.log($window.id);
    $scope.temp = $window.id;
    $http({
        method: 'PUT',
        url: '/fsubmit/' + $scope.temp
    })
    .then(function(response){
        console.log($window.id);
        console.log("Final Submit");
        $window.alert("You project has been submitted");
        $location.path('/main/' + $window.usrnme);
    });
}



}]);

tabsDemoIconTabs.controller('LoginCtrl', ['$location', '$scope', '$timeout', '$mdSidenav', '$log', '$http', '$window', function($location, $scope, $timeout, $mdSidenav, $log, $http, $window){
  $scope.test = "awesome";
  $scope.Admin = function(){
    if($scope.admin.username=="root" && $scope.admin.password=="root")
    {
      $location.path('/admin');
    }
    else
    {
      console.log('Auth Error');
      $window.alert("Authentication Error");
    }
  }

  $scope.Emp = function(user){
    if(($scope.emp.username=="jay" && $scope.emp.password=="jay")||($scope.emp.username=="test" && $scope.emp.password=="test"))
    {
      $window.usrnme = user;
      $location.path('/main/' + user);
    }
    else
    {
      console.log('Auth Error');
      $window.alert("Authentication Error");
    }
  }

}]);

tabsDemoIconTabs.controller('EmpCtrl', ['$location', '$scope', '$timeout', '$mdSidenav', '$log', '$http', '$window', function($location, $scope, $timeout, $mdSidenav, $log, $http, $window){
  console.log($window.id);
  $http({
    method: 'GET',
    url: '/logMntr/' + $window.id,
    data: $scope.log
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.log = response.data;
    console.log($scope.log);
  });

  $http({
    method: 'GET',
    url: '/eventInfo/' + $window.id,
    data: $scope.evt
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.evt = response.data;
    console.log($scope.evt);
  });

  $http({
    method: 'GET',
    url: '/devInfo/' + $window.id,
    data: $scope.gen
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.dev = response.data;
    console.log($scope.dev);
  });

  $http({
    method: 'GET',
    url: '/appPerf/' + $window.id,
    data: $scope.perf
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.perf = response.data;
    console.log($scope.perf);
});

  $http({
    method: 'GET',
    url: '/webApp/' + $window.id,
    data: $scope.web
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.web = response.data;
    console.log($scope.web);
  });

  $http({
    method: 'GET',
    url: '/admin/' + $window.id,
    data: $scope.gen
    })
    .then(function(response){
      console.log("Get general request Sent");
      console.log(response.data);
      $scope.gen = response.data;
      console.log($scope.gen);
  });

  $http({
    method: 'GET',
    url: '/reqPage/' + $window.id,
    data: $scope.req
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.req = response.data;
    console.log($scope.req);
  });

  $http({
    method: 'GET',
    url: '/alertAuto/' + $window.id,
    data: $scope.auto
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.auto = response.data;
    console.log($scope.auto);
  });

  $http({
    method: 'GET',
    url: '/alertThres/' + $window.id,
    data: $scope.ant
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.ant = response.data;
    console.log($scope.ant);
  });

  $http({
    method: 'GET',
    url: '/alertNot/' + $window.id,
    data: $scope.not
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.not = response.data;
    console.log($scope.not);
  });

  $http({
    method: 'GET',
    url: '/resInfo/' + $window.id,
    data: $scope.res
  })
  .then(function(response){
    console.log("Get Req Sent");
    console.log(response.data);
    $scope.res = response.data;
    console.log("Alert Response Procedures");
    console.log($scope.res);
  });

}]);
tabsDemoIconTabs.controller('ProjCtrl', ['$location', '$scope', '$timeout', '$mdSidenav', '$log', '$http', '$window', function($location, $scope, $timeout, $mdSidenav, $log, $http, $window){
  $scope.uname = $window.usrnme;
  console.log($scope.uname);
  $http({
    method: "GET",
    url: "/project/" + $scope.uname
  })
  .then(function(response){
    console.log(response.data);
    $scope.projid = response.data;
  });

  $http({
    method: "GET",
    url: "/cprojects/" + $scope.uname
  })
  .then(function(response){
  console.log(response.data);
  $scope.cproj = response.data;
  console.log($scope.cproj);
  });

  $scope.project = function(id) {
    $window.id = id;
    $location.path('/main/' + $scope.uname + "/" + id);
  }

  $scope.form = function(id){
    $window.id = id;
    console.log($window.id);
    $location.path('/main/' + $scope.uname + "/" + id);
    $scope.projdata = {
          projectId: id,
          projectName: $scope.app.name,
          empName: $scope.uname,
    };
    console.log($scope.projdata);
    $http({
        method: "POST",
        url: "/projdetails",
        data: $scope.projdata,
    })
    .then(function(response){
      console.log(response.data);
      console.log("data inserted");
    });
  }
}]);

tabsDemoIconTabs.controller('AdCtrl', ['$location', '$scope', '$timeout', '$mdSidenav', '$log', '$http', '$window', function($location, $scope, $timeout, $mdSidenav, $log, $http, $window){

$http({
    method: "GET",
    url: "/names",
  })
  .then(function(response){
    console.log(response.data);
    $scope.userid = response.data;
  });

  $scope.users = function(usr){
    $scope.usr = $window.projuser;
  console.log($scope.usr);
    $http({
    method: "GET",
    url: "/projuser/" + usr
  })
  .then(function(response){
  console.log(response.data);
  $scope.usrproj = response.data;
  console.log($scope.usrproj);
  $window.projuser = usr;
  });

  }

  $scope.xx = function(pid){
   $location.path('/admin/' + pid);
   $window.adminapp = pid;
  }
}]);

tabsDemoIconTabs.controller('AdminCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$http', '$window', function($scope, $timeout, $mdSidenav, $log, $http, $window){
  $scope.dat = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false
  };

  $scope.data1 = {
    Label1: "General Information",
    Label2:   "Requirements, Summary and KPI"
  };
  $scope.data2 = {
    Label3: "Device Onboarding",
    Label4:   "Alert Notification Rules",
    Label5: "Service-Impact-Analysis",
    Label6:   "Alert Response Procedures",
    Label7: "Event Management Rules",
    Label8:   "Alert Auto Remediation"
  };
  $scope.data3 = {
    Label9: "Web-App Basic Monitoring",
    Label10:   "Web-App Advanced Monitoring",
    Label11: "Alert Notification and Tresholds"
  };
  $scope.data4 = {
    Label12:   "Log Monitoring and Analysis"
  };
  $scope.data5 = {
      Label13: "Application Performance Analysis"
  } ;
  $scope.data6 = {
      Label14:   "CCP Open Stack Analysis"
  };
  $scope.data7 = {
      Label15: "Database Insight Monitoring",
  };
  $scope.data8 = {
    Label16: "Network Performance Monitoring"
  };

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  };

  var tabs = [ "General Information", "Requirements, Summary and KPI" ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old && (old != current)) $log.debug('Goodbye ' + previous + '!');
      if ( current + 1 )                $log.debug('Hello ' + selected + '!');
    });

    $scope.addTab = function (title) {
      tabs.indexOf(title) === -1 ? tabs.push(title) : console.log("This item already exists");
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };

$scope.adapp = $window.adminapp;
$http({
method: 'GET',
url: '/admin/' + $scope.adapp,
data: $scope.gen
})
.then(function(response){
console.log("Get general request Sent");
console.log(response.data);
$scope.gen = response.data;
console.log($scope.gen);

});
$scope.selected_general = {};
$scope.getTemplate = function (g) {
      if (g.projectId === $scope.selected_general.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editInfo = function (g) {
      $scope.selected_general = angular.copy(g);
      console.log($scope.selected_general);
  };
$scope.saveContact = function (idx) {
      console.log("Saving contact");
      $scope.gen[idx] = angular.copy($scope.selected_general);
      console.log($scope.gen[idx]);
      $http({
        method: 'POST',
        url: '/genAdmin',
        data: $scope.gen[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.gen);

});
      $scope.reset();
  };
$scope.reset = function () {
      $scope.selected_general = {};
  };

$http({
method: 'GET',
url: '/eventInfo/' + $scope.adapp,
data: $scope.evt
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.evt = response.data;
console.log($scope.evt);

});
$scope.selected_evt = {};
$scope.getEvt = function (g) {
      if (g.projectId === $scope.selected_evt.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editEvt = function (g) {
      $scope.selected_evt = angular.copy(g);
  };
$scope.saveEvt = function (idx) {
      console.log("Saving contact");
      $scope.evt[idx] = angular.copy($scope.selected_evt);
      console.log($scope.evt[idx]);
      $http({
        method: 'PUT',
        url: '/evtAdmin',
        data: $scope.evt[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.evt);

});
      $scope.resetEvt();
  };
$scope.resetEvt = function () {
      $scope.selected_evt = {};
  };

$http({
method: 'GET',
url: '/devInfo/' + $scope.adapp,
data: $scope.dev
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.dev = response.data;
console.log($scope.dev);

});
$scope.selected_dev = {};
$scope.getdev = function (g) {
      if (g.projectId === $scope.selected_dev.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editdev = function (g) {
      $scope.selected_dev = angular.copy(g);
  };
$scope.savedev = function (idx) {
      console.log("Saving contact");
      $scope.dev[idx] = angular.copy($scope.selected_dev);
      console.log($scope.dev[idx]);
      $http({
        method: 'PUT',
        url: '/devAdmin',
        data: $scope.dev[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.dev);

});
      $scope.resetdev();
  };
$scope.resetdev = function () {
      $scope.selected_dev = {};
  };

  $http({
method: 'GET',
url: '/resInfo/' + $scope.adapp,
data: $scope.res
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.res = response.data;
console.log("Alert Response Procedures");
console.log($scope.res);

});
$scope.selected_res = {};
$scope.getres = function (g) {
      if (g.projectId === $scope.selected_res.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editres = function (g) {
      $scope.selected_res = angular.copy(g);
  };
$scope.saveres = function (idx) {
      console.log("Saving contact");
      $scope.res[idx] = angular.copy($scope.selected_res);
      console.log($scope.res[idx]);
      $http({
        method: 'PUT',
        url: '/resAdmin',
        data: $scope.res[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.res);

});
      $scope.resetres();
  };
$scope.resetres = function () {
      $scope.selected_res = {};
  };

  $http({
method: 'GET',
url: '/webApp/' + $scope.adapp,
data: $scope.web
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.web = response.data;
//console.log("Alert Response Procedures");
console.log($scope.web);

});
$scope.selected_web = {};
$scope.getweb = function (g) {
      if (g.projectId === $scope.selected_web.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editweb = function (g) {
      $scope.selected_web = angular.copy(g);
  };
$scope.saveweb = function (idx) {
      console.log("Saving contact");
      $scope.web[idx] = angular.copy($scope.selected_web);
      console.log($scope.web[idx]);
      $http({
        method: 'PUT',
        url: '/webAdmin',
        data: $scope.web[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.web);

});
      $scope.resetweb();
  };
$scope.resetweb = function () {
      $scope.selected_web = {};
  };

  $http({
method: 'GET',
url: '/logMntr/' + $scope.adapp,
data: $scope.log
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.log = response.data;
//console.log("Alert Response Procedures");
console.log($scope.log);

});
$scope.selected_log = {};
$scope.getlog = function (g) {
      if (g.projectId === $scope.selected_log.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editlog = function (g) {
      $scope.selected_log = angular.copy(g);
  };
$scope.savelog = function (idx) {
      console.log("Saving contact");
      $scope.log[idx] = angular.copy($scope.selected_log);
      console.log($scope.log[idx]);
      $http({
        method: 'PUT',
        url: '/logAdmin',
        data: $scope.log[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.log);

});
      $scope.resetlog();
  };
$scope.resetlog = function () {
      $scope.selected_log = {};
  };

  $http({
method: 'GET',
url: '/alertNot/' + $scope.adapp,
data: $scope.not
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.not = response.data;
//console.log("Alert Response Procedures");
console.log($scope.not);

});
$scope.selected_not = {};
$scope.getnot = function (g) {
      if (g.projectId === $scope.selected_not.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editnot = function (g) {
      $scope.selected_not = angular.copy(g);
  };
$scope.savenot = function (idx) {
      console.log("Saving contact");
      $scope.not[idx] = angular.copy($scope.selected_not);
      console.log($scope.not[idx]);
      $http({
        method: 'PUT',
        url: '/notAdmin',
        data: $scope.not[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.not);

});
      $scope.resetnot();
  };
$scope.resetnot = function () {
      $scope.selected_not = {};
  };

  $http({
method: 'GET',
url: '/appPerf/' + $scope.adapp,
data: $scope.perf
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.perf = response.data;
//console.log("Alert Response Procedures");
console.log($scope.perf);

});
$scope.selected_perf = {};
$scope.getperf = function (g) {
      if (g.projectId === $scope.selected_perf.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editperf = function (g) {
      $scope.selected_perf = angular.copy(g);
  };
$scope.saveperf = function (idx) {
      console.log("Saving contact");
      $scope.perf[idx] = angular.copy($scope.selected_perf);
      console.log($scope.perf[idx]);
      $http({
        method: 'PUT',
        url: '/perfAdmin',
        data: $scope.perf[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.perf);

});
      $scope.resetperf();
  };
$scope.resetperf = function () {
      $scope.selected_perf = {};
  };

  $http({
method: 'GET',
url: '/alertThres/' + $scope.adapp,
data: $scope.ant
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.ant = response.data;
//console.log("Alert Response Procedures");
console.log($scope.ant);

});
$scope.selected_ant = {};
$scope.getant = function (g) {
      if (g.projectId === $scope.selected_ant.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editant = function (g) {
      $scope.selected_ant = angular.copy(g);
  };
$scope.saveant = function (idx) {
      console.log("Saving contact");
      $scope.ant[idx] = angular.copy($scope.selected_ant);
      console.log($scope.ant[idx]);
      $http({
        method: 'PUT',
        url: '/thresAdmin',
        data: $scope.ant[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.ant);

});
      $scope.resetant();
  };
$scope.resetant = function () {
      $scope.selected_ant = {};
  };

  $http({
method: 'GET',
url: '/alertAuto/' + $scope.adapp,
data: $scope.auto
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.auto = response.data;
//console.log("Alert Response Procedures");
console.log($scope.auto);

});
$scope.selected_auto = {};
$scope.getauto = function (g) {
      if (g.projectId === $scope.selected_auto.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editauto = function (g) {
      $scope.selected_auto = angular.copy(g);
  };
$scope.saveauto = function (idx) {
      console.log("Saving contact");
      $scope.auto[idx] = angular.copy($scope.selected_auto);
      console.log($scope.auto[idx]);
      $http({
        method: 'PUT',
        url: '/autoAdmin',
        data: $scope.auto[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.auto);

});
      $scope.resetauto();
  };
$scope.resetauto = function () {
      $scope.selected_auto = {};
  };

$scope.addDep = function(){
  $scope.config = {
    cmdbClass: $scope.cmdbClass,
    type: $scope.type,
    monitorName: $scope.monitorName,
    monitorType: $scope.monitorType
  };
  console.log($scope.config);
  $http({
    method: "POST",
    url: "/addserver",
    data:$scope.config
  })
  .then(function(response){
    console.log("Data posted");
    $scope.cmdbClass = "";
    $scope.type = "";
    $scope.monitorType= "";
    $scope.monitorName= "";
    $scope.isDisabled="true";
  })
};

$scope.addSev = function(){
  $scope.config = {
    svrty: $scope.svrty
  };
  console.log($scope.config);
  $http({
    method: "POST",
    url: "/addseverity",
    data: $scope.config
  })
  .then(function(response){
    console.log("Data Added");
    $scope.svrty= "";
    $scope.isDisabled= "true";
  })
}

$http({
method: 'GET',
url: '/reqPage/' + $scope.adapp,
data: $scope.req
})
.then(function(response){
console.log("Get Req Sent");
console.log(response.data);
$scope.req = response.data;
//console.log("Alert Response Procedures");
console.log($scope.req);

});
$scope.selected_req = {};
$scope.getreq = function (g) {
      if (g.projectId === $scope.selected_req.projectId)
        return 'edit';
      else
        return 'display';
  };
$scope.editreq = function (g) {
      $scope.selected_req = angular.copy(g);
  };
$scope.savereq = function (idx) {
      console.log("Saving contact");
      $scope.req[idx] = angular.copy($scope.selected_req);
      console.log($scope.req[idx]);
      $http({
        method: 'PUT',
        url: '/reqAdmin',
        data: $scope.req[idx]
      })
      .then(function(response){
      console.log("Get Gen Sent");
      console.log(response.data);
      console.log($scope.req);

});
      $scope.resetreq();
  };
$scope.resetreq = function () {
      $scope.selected_req = {};
  };

  $scope.exportData = function () {
        alasql('SELECT * INTO XLSX("mydata.xlsx",{headers:true}) FROM ?',[$scope.auto]);
    };
    $scope.items = [{a:1,b:10},{a:2,b:20},{a:3,b:30}];



}]);
