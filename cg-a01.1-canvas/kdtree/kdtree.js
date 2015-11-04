/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: kdtree
 *
 *
 */


/* requireJS module definition */
define(["KdUtil", "vec2", "Scene", "KdNode", "BoundingBox"],
    (function(KdUtil, vec2, Scene, KdNode, BoundingBox) {

        "use strict";

        /**
         * Creates a kd-tree. The build function is directly called
         * on generation
         *
         * @param pointList
         * @constructor
         */
        var KdTree = function (pointList) {

            /**
             *
             * @param pointList - list of points
             * @param dim       - current axis
             * @param parent    - current parent (starts with root)
             * @param isLeft    - flag if node is left or right child of its parent
             * @returns returns root node after tree is build
             */
            this.build = function(pointList, dim, parent, isLeft) {
				var axis = dim;
                // IMPLEMENT!
                // create new node
				var node = new KdNode(dim);
				
                // find median position in pointList
                var median = KdUtil.median(pointList,dim);
                // compute next axis
              
                // set point in node
                node.point = pointList[median];
				console.log(node.point);
				
                // compute bounding box for node
                // check if node is root (has no parent)
                // if (!parent)
				
                // take a look in findNearestNeighbor why we 
                // need this bounding box!
                if( !parent ) {
                    // Note: hardcoded canvas size here
					node.bbox = new BoundingBox(0, 0, 500, 400, node.point, axis);
					
                } else {
				
                    // create bounding box and distinguish between axis and
                    // which side (left/right) the node is on
					if(axis==0){
						if(isLeft){
							node.bbox = new BoundingBox(parent.bbox.xmin,parent.ymin,parent.bbox.xmax,parent.point.p0[1],node.point,axis);

						}
						else {
							node.bbox = new BoundingBox(parent.bbox.xmin,parent.point.p0[1],parent.bbox.xmax,parent.bbox.ymax,node.point,axis);

						}
					}
					else{
						if(isLeft){
							node.bbox = new BoundingBox(parent.bbox.xmin,parent.bbox.ymin,parent.point.p0[0],parent.bbox.ymax,node.point,axis);

						}
						else{
						    node.bbox = new BoundingBox(parent.point.p0[0],parent.bbox.ymin,parent.xmax,parent.bbox.ymax,node.point,axis);

						}
					}
                }

                // create point list left/right and
				pointList.splice(median,1);
				
				 var leftPoints = [];
                 var rightPoints = [];
					
                if (pointList.length > 0){
                   
                    for (var i=0; i<pointList.length; i++){
                        if(pointList[i].p0[dim] < node.point.p0[dim]){
                            leftPoints.push(pointList[i]);
                        }else{
                            rightPoints.push(pointList[i]);
                        }
                    }

                  
                }
                // call build for left/right arrays
				if(leftPoints.length > 0) node.leftChild = this.build(leftPoints,1-axis,node,true);
				if(rightPoints.length > 0) node.rightChild = this.build(rightPoints,1-axis,node,false);
	  
				return node;
                // return root node
            };

            /**
             * Given a query point the function return its nearest neighbor by traversing
             * down the tree
             *
             * @param node - current tree node
             * @param query - query node
             * @param nearestDistance - current nearest distance to query node
             * @param currentBest - current best/nearest node to query node
             * @param dim - current axis (x or y)
             * @returns closest tree node to query node
             */
            this.findNearestNeighbor = function(node, query, nearestDistance, currentBest, dim) {

                if( !node ) {
                    return currentBest;
                }

                var closest = currentBest;
                var closestDistance = nearestDistance;

                var dist = KdUtil.distance(node.point.p0, query);
                if( dist < nearestDistance ) {
                    closestDistance = dist;
                    closest = node;
                }

                var first, second;
                if (dim == 0) {
                    if ( query[0] < node.point.p0[0]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                } else {
                    if (query[1] < node.point.p0[1]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                }

                var nextDim = (dim === 0) ? 1 : 0;
                if( first && first.bbox.distanceTo(query) < closestDistance) {
                    closest = this.findNearestNeighbor(first, query, closestDistance, closest, nextDim);
                    closestDistance = KdUtil.distance(closest.point.p0, query);
                }

                if( second && second.bbox.distanceTo(query) < closestDistance) {
                    closest = this.findNearestNeighbor(second, query, closestDistance, closest, nextDim);
                }

                return closest;
            };


            //
            this.root = this.build(pointList, 0);
            console.log(" this is the root: ", this.root);

        };

        return KdTree;


    })); // define


