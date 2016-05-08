package gamegrid;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Random;

public class PathFinder {

    private Grid grid;
    
    public PathFinder(Grid grid){
        this.grid = grid;
    }
    
    public Grid getGrid(){
        return grid;
    }
    
    public ArrayList<Node> getNeighbours(Node node){
        ArrayList<Node> neighbours = new ArrayList<Node>();
        Point point = node.getPosition();
        
        for (int i = point.x - 1; i <= point.x+1; i++) {
            if(i < 0 || i > grid.getRows()-1) {
                continue;
            }
            for (int j = point.y-1; j <= point.y+1; j++) {
                if(j < 0 || j > grid.getColumns()-1) {
                    continue;
                }
                if(i == point.x && j == point.y){
                    continue;
                }
                neighbours.add(grid.getNode(i,j));    
            }
            
        }
        
        return neighbours;
    }
    
    public boolean hasUnvisitedNeighours(ArrayList<Node> neighbours){
        for(Node node : neighbours){
            if(node == null) {
                continue;
            }
            if(!node.isvisited()){
                return true;
            }
        }
        return false;
    }
    
    public int getNumberOfUnvisited(ArrayList<Node> neighbours){
        int unvisted = 0;
        for(Node node : neighbours){
            if(node == null) {
                continue;
            }
            if(!node.isvisited()){
                unvisted++;
            }
        }
        return unvisted;
    }
    
    public int getNumberOfNeighbours(ArrayList<Node> neighbours) {
        return neighbours.size();
    }
    
    /**
    *Generate a path that is to be tapped by the player. 
    */
    public ArrayList<Node> findSequence(int maxLength){
        if(maxLength > 0){
            ArrayList<Node> path = new ArrayList<Node>();
            Random random = new Random();
            path.add(grid.getNode(random.nextInt(grid.getRows()), random.nextInt(grid.getColumns())));
            int sequenceSize = 0;
            path.get(sequenceSize).visit();
            sequenceSize++;
            
            while(sequenceSize < maxLength && sequenceSize < grid.getTotalNodes()) {
                Node node = grid.getNode(random.nextInt(grid.getRows()), random.nextInt(grid.getColumns()));
                if (!node.isvisited()) {
                    node.visit();
                    path.add(node);
                    sequenceSize++;
                }
            }
            return path;
        }
        return null;
    }
    /**
    * Generate a path that is to be swiped by the player. 
    * Objective: create a continuous path that a player may draw a 
    * line through.
    * 
> Start with a random node. Add it to list.
> Extend one step in any direction. Add it to list.
> Keep going until there are no unvisited neighbors.
    >Constraint: want path length of minimum length.
        >Keep randomly generating paths until one of satisfactory length appears?
        >
    */
    
    public ArrayList<Node> findPath(int length){
        if(length > 0){
           ArrayList<Node> path = new ArrayList<Node>();
           Random random = new Random();
           path.add(grid.getNode(random.nextInt(grid.getRows()), random.nextInt(grid.getColumns())));
           //index of the last visited node
           int lastNodeIndex = 0;
           path.get(lastNodeIndex).visit();
           lastNodeIndex++;
           
           while(hasUnvisitedNeighours(getNeighbours(path.get(lastNodeIndex-1))) && lastNodeIndex < length){
               ArrayList<Node> neighbours = getNeighbours(path.get(lastNodeIndex-1)); 
               ArrayList<Node> oneAvailablePaths = new ArrayList<Node>();
               ArrayList<Node> twoAvailablePaths = new ArrayList<Node>();
               ArrayList<Node> availablePaths = new ArrayList<Node>();
               Node lowestVisit = null;
               for(Node node : neighbours) {
                   if (node == null || node.isvisited()) {
                       continue;
                   }
                   int unvisted = getNumberOfUnvisited(getNeighbours(node));
                   if (unvisted <= 1) {
                       oneAvailablePaths.add(node);
                   } else if (unvisted <= 2) {
                       twoAvailablePaths.add(node);
                   } else {
                       if (lowestVisit == null) {
                           lowestVisit = node;
                           availablePaths.add(lowestVisit);
                       } else if (unvisted == getNumberOfUnvisited(getNeighbours(lowestVisit)) || getNumberOfNeighbours(getNeighbours(node)) > 7) {
                           availablePaths.add(node);
                       } else if (unvisted < getNumberOfUnvisited(getNeighbours(lowestVisit))) {
                           availablePaths.remove(lowestVisit);
                           lowestVisit = node;
                           availablePaths.add(lowestVisit);
                       }
                   }
               }
               int ranNum;
               if (!oneAvailablePaths.isEmpty()) {
                   ranNum = random.nextInt(oneAvailablePaths.size());
                   path.add(oneAvailablePaths.get(ranNum));
               } else if (!twoAvailablePaths.isEmpty()) {
                   ranNum = random.nextInt(twoAvailablePaths.size());
                   path.add(twoAvailablePaths.get(ranNum));
               } else {
                   ranNum = random.nextInt(availablePaths.size());
                   path.add(availablePaths.get(ranNum));
               }
               path.get(lastNodeIndex).visit();
               lastNodeIndex++;
           }
           return path; 
        }
        return null;
    }
    
}
