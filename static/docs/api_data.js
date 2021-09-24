define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./static/docs/main.js",
    "group": "/home/bolorundurovb/Documents/MetaCare_Task/static/docs/main.js",
    "groupTitle": "/home/bolorundurovb/Documents/MetaCare_Task/static/docs/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/v1/movies/:movieId",
    "title": "Get Single Movie",
    "version": "1.0.0",
    "name": "Get_Single_Movie",
    "group": "Movie",
    "description": "<p>Get single movie details</p>",
    "parameter": {
      "fields": {
        "Url Parameters": [
          {
            "group": "Url Parameters",
            "type": "String",
            "optional": false,
            "field": "movieId",
            "description": "<p>Movie unique ID.</p>"
          }
        ]
      }
    },
    "filename": "./controllers/MovieCtrl.js",
    "groupTitle": "Movie"
  }
] });
