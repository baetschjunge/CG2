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
				console.log("1");
				var axis = dim;
                // IMPLEMENT!
                // create new node
				var node = new KdNode(dim);
				
                // find median position in pointList
                var median = KdUtil.median(pointList,dim);
                // compute next axis
                if(axis=0){
					axis = 1;
					}
				else{
					axis = 0;
				}
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
					node.leftChild = new BoundingBox(0, 0, pointList[median].p0[0], 400, pointList[median], axis);
					node.rightChild = new BoundingBox(pointList[median].p0[0], 0, 500, 400, pointList[median], axis);
                } else {
                    // create bounding box and distinguish between axis and
                    // which side (left/right) the node is on
					if(axis=1){
						node.leftChild = new BoundingBox(parent.xmin,pointList[median].p0[1],parent.xmax,parent.ymax,axis);
						node.rightChild= new BoundingBox(parent.xmin,parent.ymin,parent.xmax,parent.pointList[median].p0[1],axis);
					}
					else{
						node.leftChild = new BoundingBox(parent.xmin,parent.ymin,pointList[median].p0[0],parent.ymax,axis);
						node.rightChild= new BoundingBox(pointList[median].p0[0],parent.ymin,parent.xmax,parent.ymax,axis);
					}
                }

                // create point list left/right and
                // call build for left/right arrays
          
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

                var dist = KdUtil.distance(node.point.center, query.center);
                if( dist < nearestDistance ) {
                    closestDistance = dist;
                    closest = node;
                }

                var first, second;
                if (dim == 0) {
                    if ( query.center[0] < node.point.center[0]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                } else {
                    if (query.center[1] < node.point.center[1]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                }

                var nextDim = (dim === 0) ? 1 : 0;
                if( first && first.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(first, query, closestDistance, closest, nextDim);
                    closestDistance = KdUtil.distance(closest.point.center, query.center);
                }

                if( second && second.bbox.distanceTo(query.center) < closestDistance) {
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


