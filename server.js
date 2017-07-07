var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use(bodyparser.json());

app.use(express.static(__dirname + "/public"));

var pool = mysql.createPool({
	connectionLimit: 50,
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'test'
});

app.post('/general', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO GeneralInfo SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.post('/req', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO reqInfo SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.post('/webapp', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO webapp SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.post('/alertnt', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO alertnt SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.post('/logmn', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO logmn SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.post('/appperf', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO appperf SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});


app.post("/edit", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE GeneralInfo SET title= ?, bu= ?, deptId= ?, app_name= ?, app_sname= ?, cmdb= ?, tier= ?, env= ? where name= ?', [req.body.title,
			req.body.bu, req.body.deptId, req.body.app_name, req.body.app_sname, req.body.cmdb, req.body.tier, req.body.env, req.body.name] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.get("/cmdb/:id", function(req, res){
	console.log(req.params.id);
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(type) FROM master where cmdbClass = ?', req.params.id,  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/rhel/:id", function(req, res){
	console.log(req.params.id);
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(monitorName) FROM master where type = ?', req.params.id,  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/subrhel/:id", function(req, res){
	console.log(req.params.id);
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(monitorType) FROM master where monitorName = ?', req.params.id,  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/cmdb", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(cmdbClass) as class FROM master group by cmdbClass',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/severity", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(svrty) as class FROM severity',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/webtype", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(type) as class FROM websitetype',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/chkfreq", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(frequency) as class FROM checkfrequency',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/pollerlocations", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(location) as class FROM pollerlocations',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/httpmethod", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(method) as class FROM httpmethod',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/status", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(status) as class FROM mres',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/action", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(action) as class FROM actionexecution',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/threshold", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct(type) as class FROM thresholdType',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.post("/event", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
    for(var item of req.body)
    {
    	console.log("Hello");
    	console.log(item);
  		connection.query('INSERT INTO EventInfo SET ?', item, function(err, rows, fields){
			if(!err){
    		console.log(rows);
    		res.json(rows);
			}
			else{
				console.log("error");
			}
  	})
	};
	//res.json("Data Inserted");
		connection.release();
	});
});

app.post("/divon", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
    for(var item of req.body)
    {
    	console.log("Hello");
    	console.log(item);
  		connection.query('INSERT INTO devonb SET ?', item, function(err, rows, fields){
			if(!err){
    		console.log(rows);
    		res.json(rows);
			}
			else{
				console.log("error");
			}
  	})
	};
		
		//res.json("Request Posted");
		connection.release();
	});
});

app.post("/alert", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
    for(var item of req.body)
    {
    	console.log("Hello");
    	console.log(item);
  		connection.query('INSERT INTO alertnotrule SET ?', item, function(err, rows, fields){
			if(!err){
    		console.log(rows);
    		res.json(rows);
			}
			else{
				console.log("error");
			}
  	})
	};
	//res.json("Data Inserted");
		connection.release();
	});
});

app.post("/alertr", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
    for(var item of req.body)
    {
    	console.log("Hello");
    	console.log(item);
  		connection.query('INSERT INTO alertrespro SET ?', item, function(err, rows, fields){
			if(!err){
    		console.log(rows);
    		res.json(rows);
			}
			else{
				console.log("error");
			}
  	})
	};
		connection.release();
	});
});

app.post("/alertrd", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
    for(var item of req.body)
    {
    	console.log("Hello");
    	console.log(item);
  		connection.query('INSERT INTO aarp SET ?', item, function(err, rows, fields){
			if(!err){
    		console.log(rows);
				res.json(rows);
			}
			else{
				console.log("error");
			}
  	})
	};
		connection.release();
	});
});

app.get('/admin/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM GeneralInfo where projectId = ?', req.params.id,  function(err, rows, fields){
  		if(!err){
      		console.log(rows);
					res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/eventInfo/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM eventinfo where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
      		console.log("Event Info");
					res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/devInfo/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM devonb where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
      		console.log("Dev Info");
					res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	}); 
});

app.get('/resInfo/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM alertrespro where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("Alert Response Procedures");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/webApp/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM webapp where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("Web App basic");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/logMntr/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM logmn where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("Log Mntr");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/alertNot/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM alertnotrule where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("Alert Notification rules");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/appPerf/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM appperf where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("App Performance Analysis");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/alertThres/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM alertnt where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("Alert Notification and Thresholds");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/alertAuto/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM aarp where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("Alert Auto remediation");
      		console.log(rows);
					res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.post("/genAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE GeneralInfo SET title= ?, bu= ?, deptId= ?, app_name= ?, app_sname= ?, cmdb= ?, tier= ?, env= ? where name= ?', [ req.body.title,
			req.body.bu, req.body.deptId, req.body.app_name, req.body.app_sname, req.body.cmdb, req.body.tier, req.body.env, req.body.name] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
				res.json(rows);
			}
			else{
				console.log("error");
			}

			connection.release();
  	});
	});
});

app.put("/evtAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE eventinfo SET cmdb= ?, server= ?, sub= ?, sub1= ?, thres= ?, svrt= ?, inp1= ?, yn1= ?, yn2= ?, yn3= ?,yn4= ?, inp2= ? where id= ?', [req.body.cmdb,
			req.body.server, req.body.sub, req.body.sub1, req.body.thres, req.body.svrt, req.body.inp1, req.body.yn1, req.body.yn2, req.body.yn3, req.body.yn4, req.body.inp2, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/devAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE devonb SET hstname= ?, cmdb= ?, server= ?, ip= ?, env= ?, prodstate= ?, os= ?, itfunc= ?, ci= ?, addcmt= ? where id= ?', [req.body.hstname,
			req.body.cmdb, req.body.server, req.body.ip, req.body.env, req.body.prodstate, req.body.os, req.body.itfunc, req.body.ci, req.body.addcmt, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			res.json(rows);
			}
			else{
				console.log("error");
			}
			connection.release();
  	});
	});
});

app.put("/resAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE alertrespro SET host= ?, monitor= ?, state= ?, pc= ?, ts= ? where id= ?', [req.body.host,
			req.body.monitor, req.body.state, req.body.pc, req.body.ts, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/webAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE webapp SET wurl= ?, soapm= ?, sslcm= ? where id= ?', [req.body.wurl,
			req.body.soapm, req.body.sslcm, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/logAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE logmn SET hstinfo= ?, dc= ?, da= ?, di= ?, imp= ? where id= ?', [req.body.hstinfo, req.body.dc ,req.body.da,
			req.body.di, req.body.imp, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/notAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE alertnotrule SET svrt= ?, yn1= ?, yn2= ?, da= ?, ra= ?, address= ?, rmks= ? where id= ?', [req.body.svrt, req.body.yn1 ,req.body.yn2,
			req.body.da, req.body.ra, req.body.address, req.body.rmks, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/perfAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE appperf SET appsum= ?, ahkpi= ?, aperf= ?, apptech= ?, currpast= ?, ppenv= ?, perfa= ? where id= ?', [req.body.appsum, req.body.ahkpi ,req.body.aperf,
			req.body.apptech, req.body.currpast, req.body.ppenv, req.body.perfa, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/thresAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE alertnt SET notpro= ?, trp= ? where id= ?', [req.body.notpro,
			req.body.trp, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.put("/autoAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE aarp SET mntr= ?, script= ?, ct= ?, cmnd= ?, cc= ?, ev= ?, rmks= ? where id= ?', [req.body.mntr,
			req.body.script, req.body.ct, req.body.cmnd, req.body.cc, req.body.ev, req.body.rmks, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.post("/addserver", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  		connection.query('INSERT INTO master SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
				res.json(rows);
			}
			else{
				console.log("error");
			}
	});
		connection.release();
	});
});

app.post("/addseverity", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  		connection.query('INSERT INTO severity SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
				res.json(rows);
			}
			else{
				console.log("error");
			}
	});
		connection.release();
	});
});


app.get('/reqPage/:id', function(req, res){
  console.log(req.params.id);
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT * FROM reqinfo where projectId = ?', req.params.id, function(err, rows, fields){
  		if(!err){
  			console.log("requirements");
      		console.log(rows);
					res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.put("/reqAdmin", function(req, res){
	console.log(req.body);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE reqinfo SET brd= ?, ask= ?, ahk= ?, ihk= ? where id= ?', [req.body.brd,
			req.body.ask, req.body.ahk, req.body.ihk, req.body.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.get("/project/:id", function(req, res){
	console.log(req.params.id);
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT projectId FROM project where empName = ? and final = 0', req.params.id, function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/names", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT distinct empName FROM project',  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/projuser/:id", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT projectId, projectName FROM project where empName = ?', req.params.id, function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.get("/cprojects/:id", function(req, res){
	console.log(req.params.id);
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT projectId FROM project where empName = ? and final = 1', req.params.id,  function(err, rows, fields){
			if(!err){
				console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
		});
	});
});

app.post('/projdetails', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO project SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});

app.get('/genapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM generalinfo', function(err, rows, fields){
  		if(!err){
  			console.log("GenProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/reqapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM reqinfo', function(err, rows, fields){
  		if(!err){
  			console.log("ReqProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/alertautoapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM aarp', function(err, rows, fields){
  		if(!err){
  			console.log("Alert Auto Remediation Project");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/antapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM alertnt', function(err, rows, fields){
  		if(!err){
  			console.log("AlertntProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/anotapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM alertnotrule', function(err, rows, fields){
  		if(!err){
  			console.log("AlertnotProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/aresapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM alertrespro', function(err, rows, fields){
  		if(!err){
  			console.log("AlertresProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/appapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM appperf', function(err, rows, fields){
  		if(!err){
  			console.log("AlertperfProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/divonapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM devonb', function(err, rows, fields){
  		if(!err){
  			console.log("divonProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/evtapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM eventinfo', function(err, rows, fields){
  		if(!err){
  			console.log("EventInfoProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/logapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM logmn', function(err, rows, fields){
  		if(!err){
  			console.log("LogProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.get('/webbasicapp', function(req, res){
  console.log("Get request received");
  //console.log(req.body);
  pool.getConnection(function (err, connection) {
  	connection.query('SELECT projectId FROM webapp', function(err, rows, fields){
  		if(!err){
  			console.log("WebBasicProj");
      	res.json(rows);
  		}
  		else{
  			console.log("error");
  		}
  		connection.release();
  	});
	});
});

app.put("/fsubmit/:id", function(req, res){
	console.log(req.params.id);
	pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('UPDATE project SET final= ? where projectId= ?', [1,req.params.id] , function(err, rows, fields){
			if(!err){
    		console.log(rows);
			}
			else{
				console.log("error");
			}
			res.json(rows);
			connection.release();
  	});
	});
});


app.listen(8888);
console.log("Port 8888");
